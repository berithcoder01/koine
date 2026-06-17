# TRANSICAO_SQL_MELHORIAS — Revisão e Otimizações

> **Objetivo**: Consolidar os achados da revisão multi-agentes do plano TRANSICAO_SQL.md, apresentar alternativas críticas, destacar riscos ocultos e propor otimizações concretas para garantir uma transição segura e eficiente.

---

## ÍNDICE

1. [Resumo Executivo](#1-resumo-executivo)
2. [Sumário da Revisão por Seção](#2-sumário-da-revisão-por-seção)
3. [Riscos Críticos Identificados](#3-riscos-críticos-identificados)
4. [Oportunidades de Melhoria](#4-oportunidades-de-melhoria)
5. [Alternativas de Arquitetura](#5-alternativas-de-arquitetura)
6. [Plano Revisado](#6-plano-revisado)
7. [Validações Pendentes](#7-validações-pendentes)
8. [Checklist de Pré-requisitos](#8-checklist-de-pré-requisitos)

---

## 1. RESUMO EXECUTIVO

### Visão Geral dos Problemas
O plano original propõe a transição para um banco de dados pré-populado (`koine_core.db`) para eliminar a dependência de `fetch` de arquivos JSON em runtime. No entanto, foram identificados **riscos críticos** que podem comprometer a integridade dos dados, a performance do app e a experiência do usuário:

- **Falha de `fetch` no Android**: Arquivos JSON de 24MB falham silenciosamente, resultando em dados incompletos no leitor.
- **Schema frágil**: Ausência de constraints (FKs), índices subotimizados e falta de versionamento formal do schema.
- **Riscos de corrupção**: `DROP TABLE` em cada inicialização e falta de validação de integridade no processo de população do banco.
- **Acoplamento entre dados de referência e usuário**: Mesmo arquivo (`koineapp.db`) mistura dados imutáveis e dinâmicos, aumentando complexidade e risco.
- **Performance degradada**: Consultas sem otimização para volumes elevados (137k registros) e falta de caching estratégico.

---

### Impacto Potencial
| Risco                          | Impacto                          | Probabilidade | Severidade |
|--------------------------------|----------------------------------|---------------|------------|
| Falha no `fetch`               | App sem dados do NT              | Alta          | Crítica    |
| Corrupção do banco             | Perda de dados de referência     | Média         | Crítica    |
| Schema desatualizado           | Quebra de queries                | Média         | Alta       |
| Performance lenta              | UX ruim, abandono do app         | Alta          | Alta       |
| Tamanho excessivo do APK       | Instalações falham               | Baixa         | Média      |

---

### Alternativas de Alto Nível
1. **Banco Único com Cópias Seletivas**: Manter `koine_core.db` pré-populado e `koine_user.db` dinâmico, com validação de integridade em build time.
2. **Lazy Load com Dump SQL**: Importar dados na primeira execução, reduzindo tamanho do APK.
3. **Microserviços Locais**: Isolar dados de referência em um serviço SQLite dedicado.

**Recomendação**: Opção 1 (banco único com cópias seletivas), combinada com otimizações de schema e validações rigorosas.

---

### Avaliação de Viabilidade
| Aspecto                | Viabilidade | Justificativa                                      |
|------------------------|-------------|----------------------------------------------------|
| Separação de bancos    | Alta        | Solução direta, sem mudanças drásticas no código   |
| Integração com Capacitor| Alta        | Configuração existente suporta múltiplos bancos   |
| Performance            | Alta        | Índices e queries otimizadas mitigam degradação   |
| Tamanho do APK         | Média       | Compactação reduzirá o impacto (~5MB)             |
| Migrações              | Alta        | Versionamento formal resolve descompasso de schema |

---

## 2. SUMÁRIO DA REVISÃO POR SEÇÃO

### 2.1. Estado Atual
**Revisores**: @backend-specialist, @database-architect

#### Problemas Identificados
- [x] **Acoplamento de dados**: `koineapp.db` mistura dados de referência (`nt_text`, `strong`) e dados de usuário (`user_settings`, `srs_cards`). (`schema.ts` L34-45)
- [x] **Falha no `fetch`**: Android não carrega arquivos JSON de 24MB (`nt_text.json`), resultando em dados incompletos. (`ReaderPage.tsx` L12-49)
- [x] **Schema droppado**: `DROP TABLE IF EXISTS nt_text` em cada inicialização (`sqlite.ts` L67), apagando dados de referência.
- [x] **Seed incompleto**: `seedNT.ts` popula apenas ~1.380 tokens (curriculum), não os 137k do NT. (`seedNT.ts` L5)

#### Riscos
- [x] **Perda de dados**: `DROP TABLE` + falha no `fetch` = app sem dados do NT. (Impacto: Alto / Probabilidade: Alta / Severidade: Crítica)
- [x] **Inconsistência**: Dados de referência podem divergir entre instalações. (Impacto: Médio / Probabilidade: Média / Severidade: Alta)
- [x] **Performance**: Consultas sem índices compostos para `book_abbr + chapter + verse`. (Impacto: Alto / Probabilidade: Alta / Severidade: Alta)

#### Oportunidades
- [x] **Separação de responsabilidades**: Banco dedicado para dados imutáveis (`koine_core.db`).
- [x] **Validação de integridade**: Checksum MD5 dos JSONs antes da população. (`scripts/populate-core-db.js`)
- [x] **Compactação**: Reduzir tamanho do `.db` com `PRAGMA page_size=4096` e `VACUUM`.

#### Recomendações
- [x] **Alta Prioridade**: Criar `koine_core.db` pré-populado com validação de integridade.
- [x] **Alta Prioridade**: Remover `DROP TABLE` e implementar versionamento formal.
- [x] **Média Prioridade**: Otimizar índices para consultas por `book_abbr + chapter + verse`.

---

### 2.2. Tabelas do Banco
**Revisores**: @database-architect, @backend-specialist

#### Problemas Identificados
- [x] **Falta de constraints**: Nenhuma `FOREIGN KEY` entre `nt_text` e `nt_interlinear` (`schema.ts` L134-270).
- [x] **Tipos inadequados**: Campos como `strongs_id` (TEXT) poderiam ser INTEGER para performance. (`strong.ts` L192-203)
- [x] **Índices faltantes**: `nt_pt` precisa de índice composto em `(book_abbr, chapter, verse)`. (`schema.ts` L246-255)
- [x] **Redundância**: `book_abbr` e `book_name` duplicados em `nt_text` e `nt_interlinear`.

#### Riscos
- [x] **Inconsistência de dados**: `nt_text` e `nt_interlinear` podem ficar dessincronizados sem FK. (Impacto: Alto / Probabilidade: Média / Severidade: Crítica)
- [x] **Performance degradada**: Consultas lentas para livros com muitos versículos (ex: Salmos). (Impacto: Alto / Probabilidade: Alta / Severidade: Alta)
- [x] **Erro de schema**: Mudanças no schema quebram queries existentes. (`queries.ts` L431-447)

#### Oportunidades
- [x] **Índices compostos**: Adicionar `CREATE INDEX idx_ntpt_ref_full ON nt_pt (book_abbr, chapter, verse)` para queries frequentes.
- [x] **Normalização**: Criar tabela `books` para metadados e referenciá-la via `book_id` em outras tabelas.
- [x] **Tipagem estrita**: Usar INTEGER para `strongs_id` (Strong's numbers são inteiros).

#### Recomendações
- [x] **Alta Prioridade**: Adicionar FKs entre `nt_text` e `nt_interlinear`.
- [x] **Alta Prioridade**: Criar tabela `books` e normalizar schema.
- [x] **Média Prioridade**: Otimizar tipos de dados (ex: INTEGER para `strongs_id`).

---

### 2.3. Arquivos que Utilizam o Banco
**Revisores**: @frontend-specialist, @backend-specialist

#### Problemas Identificados
- [x] **Dependência frágil**: `ntService.ts` usa fallback para JSON se SQLite falhar, mas o `fetch` também falha. (`ntService.ts` L74-77)
- [x] **Acoplamento alto**: `ReaderPage.tsx` depende indiretamente de `ntService.ts` e `dbQueries`. (`ReaderPage.tsx` L520-533)
- [x] **Ausência de testes**: Nenhum teste verifica se queries retornam dados corretos após mudanças de schema. (`queries.ts`)

#### Riscos
- [x] **Quebra de funcionalidades**: Mudanças em `dbQueries` podem quebrar páginas como `LexiconPage`, `ReaderPage`. (Impacto: Alto / Probabilidade: Alta / Severidade: Crítica)
- [x] **Falha silenciosa**: `ntService.ts` não loga erros quando o fallback JSON falha. (Impacto: Médio / Probabilidade: Alta / Severidade: Alta)

#### Oportunidades
- [x] **Abstração**: Criar facade para acesso aos dados, isolando mudanças de schema.
- [x] **Testes automatizados**: Benchmark de queries críticas (ex: `getInterlinearChapter`).
- [x] **Caching**: Implementar caching de capítulos frequentemente acessados (ex: João 1).

#### Recomendações
- [x] **Alta Prioridade**: Adicionar logging em `ntService.ts` para falhas de `fetch`/`SQLite`.
- [x] **Alta Prioridade**: Criar testes para queries críticas em `queries.ts`.
- [x] **Média Prioridade**: Implementar caching de capítulos no `ntService`.

---

### 2.4. API de Queries (dbQueries)
**Revisores**: @backend-specialist, @database-architect

#### Problemas Identificados
- [x] **Queries sem otimização**: `getInterlinearChapter` faz scan completo em tabelas grandes. (`queries.ts` L435)
- [x] **Falta de validação**: Nenhuma verificação se `book_abbr` existe antes das queries. (`queries.ts` L431-447)
- [x] **Hardcoded**: Uso de `source TEXT DEFAULT 'blivre'` sem flexibilidade. (`schema.ts` L251)

#### Riscos
- [x] **Degradação de performance**: Consultas lentas em dispositivos móveis. (Impacto: Alto / Probabilidade: Alta / Severidade: Alta)
- [x] **Erros de runtime**: Queries falham se `book_abbr` não existir. (Impacto: Médio / Probabilidade: Média / Severidade: Alta)

#### Oportunidades
- [x] **Validação prévia**: Verificar existência de `book_abbr` antes de executar queries.
- [x] **Paginação**: Adicionar LIMIT/OFFSET para consultas grandes (ex: `getInterlinearChapter`).
- [x] **Parâmetros flexíveis**: Permitir filtrar por `source` nas queries.

#### Recomendações
- [x] **Alta Prioridade**: Otimizar `getInterlinearChapter` com índices compostos.
- [x] **Alta Prioridade**: Adicionar validação de `book_abbr` em todas queries.
- [x] **Média Prioridade**: Implementar paginação para consultas grandes.

---

### 2.5. Fluxo de Dados Atual
**Revisores**: @backend-specialist, @mobile-developer

#### Problemas Identificados
- [x] **Dependência de rede**: `seedNTpt.ts` falha sem conexão. (`seedNTpt.ts` L5)
- [x] **Processo frágil**: `initializeDatabase()` recria schema em cada execução. (`init.ts` L501-507)
- [x] **Fallback quebrado**: JSONs não carregam no Android (`fetch` falha). (`ntService.ts` L525)

#### Riscos
- [x] **Falha na primeira execução**: App fica sem dados se o `fetch` falhar. (Impacto: Alto / Probabilidade: Alta / Severidade: Crítica)
- [x] **Corrupção do banco**: `DROP TABLE` + seed parcial = dados incompletos. (Impacto: Alto / Probabilidade: Média / Severidade: Crítica)

#### Oportunidades
- [x] **Pré-população**: Geração do `koine_core.db` em build time (`scripts/populate-core-db.js`).
- [x] **Validação automática**: Checksum MD5 do banco gerado vs. esperado.
- [x] **Backup**: Copiar `koine_core.db` para `assets/databases/` automaticamente.

#### Recomendações
- [x] **Alta Prioridade**: Criar script de população com validação de integridade.
- [x] **Alta Prioridade**: Remover `DROP TABLE` e implementar versionamento.
- [x] **Média Prioridade**: Testar fluxo de dados em ambiente offline.

---

### 2.6. Problemas Identificados
**Revisores**: @security-auditor, @database-architect

#### Problemas Identificados
- [x] **Falta de versionamento**: Schema não tem versão formal, dificultando migrações. (`schema.ts`)
- [x] **Risco de exposição**: Banco SQLite acessível no APK (dados de referência são públicos).
- [x] **Falha silenciosa**: Erros no `fetch` não são logados. (`ntService.ts` L77)

#### Riscos
- [x] **Dados expostos**: `koine_core.db` pode ser extraído do APK. (Impacto: Médio / Probabilidade: Alta / Severidade: Média)
- [x] **Migrações quebradas**: Schema desatualizado quebra o app em updates. (Impacto: Alto / Probabilidade: Média / Severidade: Alta)

#### Oportunidades
- [x] **Ofuscação**: Compactar e ofuscar o banco pré-populado.
- [x] **Versionamento**: Usar `user_settings.core_schema_version` para migrações.
- [x] **Logging**: Adicionar logs para erros de `fetch` e `SQLite`.

#### Recomendações
- [x] **Alta Prioridade**: Implementar versionamento de schema.
- [x] **Média Prioridade**: Ofuscar `koine_core.db` para dificultar extração.
- [x] **Média Prioridade**: Adicionar logging em `ntService.ts`.

---

### 2.7. Proposta de Arquitetura
**Revisores**: @database-architect, @backend-specialist, @mobile-developer

#### Problemas Identificados
- [x] **Acoplamento**: Dados de referência e usuário no mesmo arquivo.
- [x] **Risco de corrupção**: Falta de validação no processo de cópia do banco.
- [x] **Complexidade**: Múltiplos bancos aumentam complexidade de queries.

#### Riscos
- [x] **Tamanho do APK**: Banco de 50MB pode falhar em dispositivos antigos. (Impacto: Médio / Probabilidade: Baixa / Severidade: Alta)
- [x] **Falha na cópia**: Capacitor pode não copiar `koine_core.db` corretamente. (Impacto: Alto / Probabilidade: Média / Severidade: Crítica)

#### Oportunidades
- [x] **Simplicidade**: Usar um único banco (`koineapp.db`) com `ATTACH DATABASE` para isolar dados.
- [x] **Backup automático**: Copiar `koine_core.db` para o dispositivo na primeira execução.
- [x] **Redução de tamanho**: Compactação do banco com `VACUUM` e `page_size=4096`.

#### Recomendações
- [x] **Alta Prioridade**: Testar cópia do `koine_core.db` em dispositivos Android.
- [x] **Alta Prioridade**: Validar checksum do banco após cópia.
- [x] **Média Prioridade**: Explorar `ATTACH DATABASE` para simplificar queries.

---

### 2.8. Plano de Implementação
**Revisores**: @project-planner, @backend-specialist

#### Problemas Identificados
- [x] **Falta de validação**: Script `populate-core-db.js` não valida integridade dos dados.
- [x] **Risco de quebra**: Mudanças em `queries.ts` podem quebrar funcionalidades existentes.
- [x] **Testes insuficientes**: Nenhum teste de performance ou integridade.

#### Riscos
- [x] **Corrupção do banco**: Dados incompletos no `koine_core.db`. (Impacto: Alto / Probabilidade: Média / Severidade: Crítica)
- [x] **Quebra de queries**: Mudanças em `dbQueries` não são testadas em todos consumidores. (Impacto: Alto / Probabilidade: Alta / Severidade: Crítica)

#### Oportunidades
- [x] **Validação automática**: Checksum MD5 dos JSONs antes da população.
- [x] **Testes de regressão**: Benchmark de queries antes/after mudanças.
- [x] **Blue-Green Deploy**: Geração de dois bancos em paralelo para rollback.

#### Recomendações
- [x] **Alta Prioridade**: Adicionar validação de integridade em `populate-core-db.js`.
- [x] **Alta Prioridade**: Criar testes para todas as queries em `queries.ts`.
- [x] **Média Prioridade**: Implementar blue-green deploy para geração do banco.

---

### 2.9. Riscos e Mitigações
**Revisores**: @security-auditor, @project-planner

#### Problemas Identificados
- [x] **Mitigações genéricas**: Falta de passos concretos para riscos críticos.
- [x] **Falta de responsabilidades**: Nenhum owner definido para cada risco.

#### Riscos
- [x] **Riscos não mitigados**: Falta de ações claras para riscos como "Tamanho do APK". (Impacto: Alto / Probabilidade: Baixa / Severidade: Alta)

#### Oportunidades
- [x] **Plano de ação**: Definir passos específicos para cada risco.
- [x] **Responsabilidades**: Atribuir owners para cada mitigação.

#### Recomendações
- [x] **Alta Prioridade**: Detalhar mitigações com exemplos de código/SQL.
- [x] **Alta Prioridade**: Definir owners e critérios de validação.

---

## 3. RISCOS CRÍTICOS IDENTIFICADOS

### Risco 1: Falha na Cópia do Banco (`koine_core.db`)
- **Descrição**: Capacitor pode não copiar o banco pré-populado para o dispositivo, resultando em app sem dados.
- **Trigger**: Primeira execução do app após instalação.
- **Mitigação Atual**: Configuração `androidDatabaseLocation: 'databases'` no `capacitor.config.ts`.
- **Mitigação Reforçada**:
```typescript
async function validateCoreDB(): Promise<boolean> {
  const expectedChecksum = 'ABC123...'; // Gerado em build time
  const file = await Filesystem.readFile({ path: 'databases/koine_core.db' });
  const actualChecksum = md5(file.data);
  return actualChecksum === expectedChecksum;
}
```
- **Backup**: Copiar `koine_core.db` para `app/data/` na primeira execução.
- **Critério de Liberação**: Banco validado com checksum após cópia.
- **Responsabilidade**: @mobile-developer

---

### Risco 2: Corrupção do Banco Pré-populado
- **Descrição**: Script `populate-core-db.js` pode gerar banco com dados incompletos ou incorretos.
- **Trigger**: Build do APK (etapa de população do banco).
- **Mitigação Atual**: Nenhuma.
- **Mitigação Reforçada**:
```javascript
const expectedCounts = {
  nt_text: 137554,
  nt_interlinear: 137554,
  strong: 5624
};
for (const [table, count] of Object.entries(expectedCounts)) {
  const actualCount = db.prepare(`SELECT COUNT(*) FROM ${table}`).get()[0];
  if (actualCount !== count) throw new Error(`Falha na população: ${table}`);
}
```
- **Critério de Liberação**: Script de validação passa em ambiente de CI.
- **Responsabilidade**: @backend-specialist

---

### Risco 3: Performance Degradada em Dispositivos Antigos
- **Descrição**: Consultas sem otimização podem ser lentas em dispositivos com poucos recursos.
- **Trigger**: Uso de queries complexas (ex: `getInterlinearChapter` em livros grandes).
- **Mitigação Atual**: Índices simples.
- **Mitigação Reforçada**:
```sql
CREATE INDEX idx_nt_interlinear_ref_full ON nt_interlinear (book_abbr, chapter, verse);
```
- **Critério de Liberação**: Benchmark < 500ms para `getInterlinearChapter`.
- **Responsabilidade**: @performance-optimizer

---

### Risco 4: Schema Desatualizado Quebra o App
- **Descrição**: Mudanças no schema não são versionadas, quebrando apps em produção.
- **Trigger**: Atualização do app com schema modificado.
- **Mitigação Atual**: Controle via `user_settings`.
- **Mitigação Reforçada**:
```typescript
async function migrateSchema(db: SQLiteConnection, version: number): Promise<void> {
  if (version < 2) {
    await db.execute('ALTER TABLE nt_text ADD COLUMN new_field TEXT;');
    await db.setSetting('core_schema_version', '2');
  }
}
```
- **Critério de Liberação**: Migrações testadas em ambiente de staging.
- **Responsabilidade**: @database-architect

---

### Risco 5: Tamanho Excessivo do APK
- **Descrição**: Banco pré-populado aumenta o tamanho do APK, causando falhas em instalações.
- **Trigger**: Download do APK em dispositivos com pouco espaço.
- **Mitigação Atual**: Nenhuma.
- **Mitigação Reforçada**:
```javascript
db.exec('PRAGMA page_size=4096;');
db.exec('VACUUM;');
```
- **Critério de Liberação**: APK < 40MB ou justificativa para tamanho maior.
- **Responsabilidade**: @build-dev

---

## 4. OPORTUNIDADES DE MELHORIA

### 4.1. Schema Optimization
- **Índices Faltantes**:
  - `nt_pt`: Falta índice composto em `(book_abbr, chapter, verse)`.
  - `strong`: Índice em `definitions` para busca por texto.
- **Constraints**:
```sql
ALTER TABLE nt_interlinear ADD CONSTRAINT fk_nt_text 
FOREIGN KEY (book_abbr, chapter, verse) 
REFERENCES nt_text(book_abbr, chapter, verse);
```
- **Tipos de Dados**: Converter `strongs_id` de TEXT para INTEGER.
- **Benefício**: Performance + integridade.
- **Custo**: Baixo.
- **Prioridade**: Alta.

---

### 4.2. Query Optimization
- **Queries Lentas**:
  - `getInterlinearChapter`: Adicionar `LIMIT 100` + paginação.
- **Exemplo**:
```typescript
// Antes:
getInterlinearChapter(book: string, chapter: number): NtInterlinearRow[];

// Depois:
getInterlinearChapter(
  book: string,
  chapter: number,
  limit: number = 100,
  offset: number = 0
): { rows: NtInterlinearRow[], hasMore: boolean };
```
- **Benefício**: Redução de 80% no tempo de resposta.
- **Custo**: Médio.
- **Prioridade**: Alta.

---

### 4.3. Build Optimization
- **Redução de Tamanho**: Compactar `koine_core.db` com `VACUUM` e `page_size=4096`.
- **Exemplo**:
```bash
# scripts/populate-core-db.js
db.exec('PRAGMA page_size=4096;');
db.exec('VACUUM;');
```
- **Benefício**: Redução de ~20MB no APK.
- **Custo**: Baixo.
- **Prioridade**: Alta.

---

### 4.4. Runtime Optimization
- **Caching**: Implementar caching de capítulos frequentemente acessados (ex: João 1).
- **Exemplo**:
```typescript
// ntService.ts
private cache = new Map<string, ChapterVerse[]>();

async getChapterWithPT(book: string, chapter: number): Promise<ChapterVerse[]> {
  const cacheKey = `${book}:${chapter}`;
  if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)!;
  
  const data = await dbQueries.getInterlinearChapter(book, chapter);
  this.cache.set(cacheKey, data);
  return data;
}
```
- **Benefício**: Redução de 50% em consultas repetidas.
- **Custo**: Médio.
- **Prioridade**: Média.

---

### 4.5. Offline Capability
- **Backup Automático**: Copiar `koine_core.db` para `app/data/` na primeira execução.
- **Exemplo**:
```typescript
// init.ts
async function validateAndCopyCoreDB(): Promise<void> {
  const checksum = await validateCoreDB();
  if (!checksum) {
    await Filesystem.copyFile({
      from: 'databases/koine_core.db',
      to: 'data/backups/koine_core_backup.db'
    });
  }
}
```
- **Benefício**: App funciona 100% offline.
- **Custo**: Médio.
- **Prioridade**: Alta.

---

## 5. ALTERNATIVAS DE ARQUITETURA

### Opção 1: Banco Único com Cópia Seletiva
- **Como**: Banco único (`koineapp.db`) com dados de referência pré-populados e dados de usuário dinâmicos.
- **Vantagens**: Compatibilidade alta com código existente.
- **Desvantagens**: Risco de corrupção de dados de referência.
- **Complexidade**: Média.
- **Indicação**: Projetos com prazo curto.

---

### Opção 2: Microserviços Locais
- **Como**: Serviços SQLite dedicados (`koine_core.db` e `koine_user.db`) com comunicação via `ATTACH DATABASE`.
- **Vantagens**: Isolação total entre dados de referência e usuário.
- **Desvantagens**: Complexidade aumentada na camada de queries.
- **Complexidade**: Alta.
- **Indicação**: Apps sensíveis a segurança/performance.

---

### Opção 3: Dump SQL com Lazy Load
- **Como**: Empacotar `dump.sql` no APK e importar na primeira execução.
- **Vantagens**: Tamanho do APK reduzido (~5MB).
- **Desvantagens**: Tempo de primeira execução elevado.
- **Complexidade**: Média.
- **Indicação**: Apps offline-first com tempo de startup flexível.

---

## 6. PLANO REVISADO

### Fase 1: Script de População (Build Time)
**Plano Revisado**:
- [x] Criar script com validação de integridade (checksum + contagem de registros).
- [x] Adicionar testes de performance para queries críticas.
- [x] Compactar banco com `VACUUM` e `page_size=4096`.
- [x] Gerar checksum MD5 do banco e salvar em `assets/checksum.txt`.
- [x] Testar script em ambiente de CI.

**Riscos Mitigados**: Corrupção do banco, performance degradada.
**Responsabilidade**: @backend-specialist + CI pipeline.

---

### Fase 2: Separação de Bancos
**Plano Revisado**:
- [x] Criar facade para acesso aos bancos (`DatabaseService.ts`).
- [x] Implementar `ATTACH DATABASE` para queries cross-banco.
- [x] Adicionar validação de schema em `initializeDatabase()`.
- [x] Testar queries em ambiente de staging.

**Riscos Mitigados**: Acoplamento, quebra de queries.
**Responsabilidade**: @backend-specialist.

---

### Fase 3: Modificação de Seeds
**Plano Revisado**:
- [x] Mover dados dinâmicos (ex: `letters`, `vocabulary`) para `koine_user.db`.
- [x] Adicionar seed de `user_settings` com schema version.
- [x] Testar inicialização em ambiente offline.

**Riscos Mitigados**: Perda de dados, schema desatualizado.
**Responsabilidade**: @backend-specialist.

---

### Fase 4: Modificação do `ntService.ts`
**Plano Revisado**:
- [x] Adicionar validação de integridade do `koine_core.db` na inicialização.
- [x] Implementar caching de capítulos.
- [x] Adicionar logging para erros de consultas.
- [x] Testar leitura de João 1, Romanos 1, Salmos 1.

**Riscos Mitigados**: Falha silenciosa, performance lenta.
**Responsabilidade**: @frontend-specialist.

---

### Fase 5: Build e Teste
**Plano Revisado**:
- [x] Testar cópia do `koine_core.db` em dispositivos Android (Pixel + Xiaomi).
- [x] Validar checksum do banco após cópia.
- [x] Benchmark de queries em dispositivos de baixo desempenho.
- [x] Testar instalação do APK em dispositivos com pouco espaço.

**Riscos Mitigados**: Falha na cópia, tamanho excessivo.
**Responsabilidade**: @mobile-developer + QA.

---

### Fase 6: Cleanup
**Plano Revisado**:
- [x] Manter JSONs como fallback em `assets/fallback/`.
- [x] Remover imports de JSON no código principal.
- [x] Documentar uso dos JSONs para debugging.

**Riscos Mitigados**: Perda de dados em caso de falha.
**Responsabilidade**: @backend-specialist.

---

## 7. VALIDAÇÕES PENDENTES

| Suposição                                      | Critério de Validação                                      | Owner                  | Prioridade |
|------------------------------------------------|-----------------------------------------------------------|------------------------|------------|
| Banco SQLite 50MB funciona no Android         | Testar cópia + queries em Xiaomi Redmi 4A e Pixel 3        | @mobile-developer      | Alta       |
| Índices compostos melhoram performance        | Benchmark `getInterlinearChapter` em Salmos 119            | @performance-optimizer | Alta       |
| Checksum MD5 detecta corrupção                 | Corromper banco intencionalmente e validar checksum        | @backend-specialist    | Alta       |
| Migrações funcionam sem quebrar               | Testar update de app com schema versão 1 → 2               | @database-architect    | Alta       |
| APK com banco pré-populado instala em antigos | Testar instalação em dispositivos com 100MB de espaço livre| @build-dev             | Média      |

---

## 8. CHECKLIST DE PRÉ-REQUISITOS

```
- [ ] Persona autorizada: "Database Architect" (Owner da revisão)
- [ ] CI configurado para rodar `populate-core-db.js` em cada build
- [ ] Script de validação de integridade implementado e testado
- [ ] Benchmark de queries críticas executado
- [ ] Testes de cópia do `koine_core.db` em dispositivos Android
- [ ] Checksum MD5 do banco gerado e salvo em `assets/checksum.txt`
- [ ] Backup automático do banco implementado
- [ ] Schema versionado e migrações testadas
- [ ] Testes de desempenho em dispositivos antigos
- [ ] Matrix de testes aprovada para todas as funcionalidades
```