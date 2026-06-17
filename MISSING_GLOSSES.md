# Projeto: Missing Glosses (Recuperação do Déficit do Interlinear)

Este documento centraliza o planejamento, o acompanhamento de progresso e os aprendizados do trabalho de mapeamento e tradução de ~43.000 palavras (31,3%) do banco de dados `nt_interlinear` que estavam apenas transliteradas no aplicativo Koine.

---

## 🎯 Objetivo
Identificar, extrair, traduzir e reintegrar as traduções portuguesas faltantes (atualmente com a flag `"glossSource": "translit"`) no arquivo central `src/assets/nt_interlinear.json`, atualizando por consequência o banco `koine_core.db`.

## 🗺️ Fases do Projeto

### Fase 1: Rastreamento e Extração [CONCLUÍDO]
- [x] Criar script `extract-missing-glosses.mjs`.
- [x] Agrupar palavras por `tokenGreek`, `lemma` e `parsing` (para cobrir ambiguidades gramaticais mantendo o agrupamento otimizado).
- [x] Gerar banco secundário JSON para tradução.

**Aprendizados da Fase 1:**
- O agrupamento de Token + Lemma + Parsing provou-se extremamente eficiente. Reduzimos as 43.157 ocorrências falhas para exatas **22.524** entradas únicas.
- O arquivo `.db-output/missing_glosses.json` foi gerado com sucesso, classificado por volume de ocorrências, facilitando a priorização do garimpo.

### Fase 2: O Garimpo (Tradução) [CONCLUÍDO]
- [x] Submeter o JSON gerado na Fase 1 a um processo de tradução (via script LLM, cruzamento com Strong, ou trabalho manual focado).
- [x] Gerar arquivo final `translated_glosses.json`.

**Aprendizados da Fase 2:**
- A abordagem de cruzamento nativo com o arquivo `strong.json` local usando a chave `strongsId` provou ser incrivelmente veloz e sem custos de API externa.
- Dos 22.524 itens únicos faltantes, conseguimos traduzir com precisão imediata **20.926** (uma taxa de ~93% de sucesso).
- As poucas sobras formam menos de 1% das 137.554 palavras de todo o NT (nomes próprios muito específicos, ou ausência de catalogação Strong original).

### Fase 3: Unificação (Merge) [CONCLUÍDO]
- [x] Criar script `merge-glosses.mjs` que cruze `translated_glosses.json` com `nt_interlinear.json`.
- [x] Substituir o conteúdo do campo `glossPT` onde couber e alterar `"glossSource"` para `"ai_translated"` (ou similar).

**Aprendizados da Fase 3:**
- A lógica do merge varreu o JSON original completo e conseguiu recuperar de forma permanente e estrutural exatas **40.480** palavras (ocorrências individuais).

### Fase 4: Recompilação do Banco [CONCLUÍDO]
- [x] Rodar `node scripts/populate-core-db.mjs`.
- [x] Validar integridade (0 palavras com "translit").
- [x] Rebuild web/Android via Capacitor.

**Aprendizados da Fase 4:**
- É vital apagar o arquivo do banco `.db-output/koine_core.db` antigo antes de regerar, caso contrário o script de compilação gera o erro "UNIQUE constraint failed" ao tentar adicionar linhas sobre as que já existem.
- O novo banco foi validado pelo próprio script e tem agora 31.26 MB de tamanho, já migrado de forma íntegra para o Android.

---
*Documento vivo para passagem de contexto entre sessões ou modelos LLM.*
