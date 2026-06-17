# 🍎 Guia Completo: Koiné no iOS

> Documento vivo para configuração, teste em dispositivo físico e publicação na App Store.

---

## Índice

1. [Pré-requisitos Obrigatórios](#1-pré-requisitos-obrigatórios)
2. [Conta Apple Developer](#2-conta-apple-developer)
3. [Configuração Inicial do Projeto](#3-configuração-inicial-do-projeto)
4. [Firebase para iOS](#4-firebase-para-ios)
5. [Banco de Dados SQLite no iOS](#5-banco-de-dados-sqlite-no-ios)
6. [Compilação e Teste no Dispositivo Físico](#6-compilação-e-teste-no-dispositivo-físico)
7. [Macetes e Armadilhas Conhecidas](#7-macetes-e-armadilhas-conhecidas)
8. [Deploy para App Store (TestFlight e Produção)](#8-deploy-para-app-store-testflight-e-produção)
9. [Checklist Geral](#9-checklist-geral)
10. [Log de Progresso](#10-log-de-progresso)

---

## 1. Pré-requisitos Obrigatórios

### Hardware
- [x] Um **Mac** (MacBook, iMac, Mac Mini — qualquer modelo). O Xcode **não roda no Windows**.
- [x] Um **iPhone** físico com iOS 16+ conectado via cabo Lightning/USB-C.

> [!CAUTION]
> **Não existe forma oficial de compilar apps iOS nativos no Windows.** Você precisará de um Mac real ou de um serviço de Mac virtual na nuvem (ex: MacStadium, GitHub Actions com macOS runner).

### Software no Mac
| Software | Versão Mínima | Como Instalar |
|----------|--------------|---------------|
| **macOS** | Ventura 13.0+ | Atualizar o sistema |
| **Xcode** | 15.0+ | Mac App Store (gratuito, ~12 GB) |
| **Xcode Command Line Tools** | — | `xcode-select --install` |
| **Node.js** | 18+ | `brew install node` ou [nodejs.org](https://nodejs.org) |
| **CocoaPods** | 1.14+ | `sudo gem install cocoapods` |
| **Git** | — | Já incluso no macOS |

### Verificação Rápida (rodar no Terminal do Mac)
```bash
# Verificar se tudo está instalado
xcode-select -p          # Deve retornar /Applications/Xcode.app/...
node -v                  # v18+ ou v20+
pod --version            # 1.14+
git --version            # qualquer versão
```

---

## 2. Conta Apple Developer

### Para Testes no Dispositivo (GRÁTIS)
Você **NÃO precisa** pagar os $99/ano para testar no seu próprio iPhone:
1. Abra o **Xcode** → Preferences → Accounts
2. Faça login com seu **Apple ID pessoal** (o mesmo do iCloud)
3. O Xcode cria automaticamente um "Personal Team" gratuito
4. Limitações do plano gratuito:
   - Apps expiram a cada **7 dias** (precisa reinstalar)
   - Máximo de **3 apps** simultâneos no dispositivo
   - Não pode usar Push Notifications reais
   - Não pode publicar na App Store

### Para Publicação na App Store ($99/ano)
1. Acesse [developer.apple.com/programs](https://developer.apple.com/programs/)
2. Inscreva-se no **Apple Developer Program** ($99 USD/ano)
3. Aguarde aprovação (pode demorar de 24h a 48h)
4. Com a conta aprovada, você terá acesso a:
   - App Store Connect (para publicar)
   - TestFlight (para testes beta)
   - Push Notifications reais
   - Provisioning Profiles e Certificates ilimitados

> [!IMPORTANT]
> **Recomendação:** Comece testando com o plano gratuito. Só pague quando estiver pronto para o TestFlight/App Store.

---

## 3. Configuração Inicial do Projeto

### Passo 1: Clonar o Repositório no Mac
```bash
git clone <URL_DO_REPOSITORIO> ~/Documents/Koine
cd ~/Documents/Koine
npm install
```

### Passo 2: Instalar o Pacote iOS do Capacitor
O nosso `package.json` atualmente tem apenas `@capacitor/android`. Precisamos adicionar o iOS:
```bash
npm install @capacitor/ios
```

### Passo 3: Adicionar a Plataforma iOS ao Projeto
```bash
# Gerar o build web primeiro
npm run build

# Criar a pasta ios/ com o projeto Xcode
npx cap add ios
```

Isso criará a pasta `ios/` na raiz do projeto com a estrutura do Xcode.

### Passo 4: Configuração Específica do iOS no `capacitor.config.ts`
Adicionar configurações específicas do iOS (se necessário):
```typescript
// capacitor.config.ts — adicionar dentro de plugins:
CapacitorSQLite: {
  androidIsEncryption: false,
  iosDatabaseLocation: 'Library/CapacitorDatabase',  // iOS-specific
  iosIsEncryption: false,
},
```

### Passo 5: Sincronizar e Abrir no Xcode
```bash
npx cap sync ios
npx cap open ios   # Abre o projeto diretamente no Xcode
```

---

## 4. Firebase para iOS

### 4.1 Registrar o App iOS no Console Firebase
1. Abra [console.firebase.google.com](https://console.firebase.google.com)
2. Selecione o projeto do Koiné
3. Clique em **"Adicionar app"** → Escolha **iOS**
4. Preencha:
   - **Bundle ID**: `com.berith.koineapp` (mesmo do `capacitor.config.ts`)
   - **Nome do app**: `Koiné`
5. Baixe o arquivo **`GoogleService-Info.plist`**

### 4.2 Colocar o Arquivo no Projeto
```bash
# Copiar para dentro do projeto iOS do Capacitor
cp ~/Downloads/GoogleService-Info.plist ios/App/App/GoogleService-Info.plist
```

> [!WARNING]
> O arquivo **precisa estar dentro de `ios/App/App/`** (não na raiz do `ios/`). Se não estiver no lugar certo, o Firebase não inicializa e o login com Google falha silenciosamente.

### 4.3 Adicionar o GoogleService-Info.plist via Xcode
1. Abra o projeto no Xcode (`npx cap open ios`)
2. No navigator à esquerda, clique com botão direito em **App** → **Add Files to "App"**
3. Selecione o `GoogleService-Info.plist`
4. Marque a checkbox **"Copy items if needed"**
5. Confirme que o **Target "App"** está selecionado

### 4.4 Configurar Google Sign-In para iOS
1. No Console Firebase → Autenticação → Métodos de login → Google
2. Copie o **"Client ID do iOS"** gerado
3. No Xcode, abra `ios/App/App/Info.plist` e adicione o URL Scheme:
   ```xml
   <key>CFBundleURLTypes</key>
   <array>
     <dict>
       <key>CFBundleURLSchemes</key>
       <array>
         <string>com.googleusercontent.apps.SEU_CLIENT_ID_INVERTIDO</string>
       </array>
     </dict>
   </array>
   ```
4. O `CLIENT_ID_INVERTIDO` é o Client ID ao contrário (ex: `com.googleusercontent.apps.123456-abcdef` vira `com.googleusercontent.apps.123456-abcdef`)

> [!TIP]
> O Client ID invertido pode ser encontrado diretamente no arquivo `GoogleService-Info.plist` no campo `REVERSED_CLIENT_ID`.

---

## 5. Banco de Dados SQLite no iOS

### Diferenças Cruciais Android vs iOS

| Aspecto | Android | iOS |
|---------|---------|-----|
| **Localização do DB** | `assets/databases/` | Bundle do app (copiado para Documents) |
| **Permissões de escrita** | Direto no assets | Precisa copiar para pasta Documents |
| **Plugin** | `@capacitor-community/sqlite` | Mesmo plugin (suporte nativo iOS) |

### Configuração do Plugin SQLite para iOS
O plugin `@capacitor-community/sqlite` já suporta iOS nativamente. Após rodar `npx cap sync ios`, o CocoaPods vai instalar a dependência Swift automaticamente.

### Macete: Pré-carregar o Banco
O nosso banco `koine_core.db` fica em `public/assets/databases/`. No iOS, o Capacitor copia a pasta `public/` para dentro do bundle do app automaticamente durante o `cap sync`. O plugin SQLite precisa ser configurado para copiar o banco do bundle para a pasta Documents na primeira execução.

Verifique se o nosso código de inicialização (`features/database/`) já faz essa cópia — se estiver usando `copyFromAssets`, ele funciona tanto em Android quanto iOS.

---

## 6. Compilação e Teste no Dispositivo Físico

### Fluxo Completo (do zero até o iPhone)
```bash
# 1. Build do projeto web
npm run build

# 2. Sincronizar assets e plugins com iOS
npx cap sync ios

# 3. Abrir no Xcode
npx cap open ios
```

### No Xcode
1. **Selecionar o Team**: Xcode → Target "App" → Signing & Capabilities → Team → Selecione seu Apple ID
2. **Selecionar o dispositivo**: Na barra superior do Xcode, troque de "Any iOS Device" para o seu **iPhone conectado**
3. **Confiar no desenvolvedor**: No iPhone, vá em Ajustes → Geral → Gerenciamento de Dispositivos → Confiar no certificado do seu Apple ID
4. **Rodar**: Clique no botão ▶️ (Play) ou pressione `Cmd + R`

> [!IMPORTANT]
> **Na primeira vez**, o iPhone vai pedir para "Confiar no Desenvolvedor". Vá em:
> **Ajustes → Geral → VPN e Gerenciamento de Dispositivos → [Seu Apple ID] → Confiar**
> Sem isso, o app não abre.

### Atalho de Terminal (após primeira configuração)
```bash
# Build + sync + run direto no dispositivo (equivalente ao que fazemos no Android)
npm run build && npx cap sync ios && npx cap run ios --target <DEVICE_ID>

# Para descobrir o ID do seu iPhone:
npx cap run ios --list
```

---

## 7. Macetes e Armadilhas Conhecidas

### 🔴 Armadilha 1: CocoaPods Desatualizado
```bash
# Se der erro de pods, rodar:
cd ios/App
pod install --repo-update
cd ../..
```

### 🔴 Armadilha 2: Signing Certificate
Se o Xcode reclamar de "No signing certificate":
1. Xcode → Preferences → Accounts → Manage Certificates
2. Clique no `+` → Apple Development
3. O Xcode gera automaticamente

### 🔴 Armadilha 3: "Untrusted Developer"
O iPhone bloqueia apps de desenvolvedores não-Apple. Resolva em:
**Ajustes → Geral → VPN e Gerenciamento de Dispositivos**

### 🔴 Armadilha 4: Safe Area (Notch / Dynamic Island)
iPhones modernos têm "notch" ou "Dynamic Island" no topo. Nosso componente `<SafeArea>` já existe no projeto e provavelmente lida com isso, mas vale verificar visualmente se o header não está coberto. Se necessário:
```css
/* Adicionar no index.css se necessário */
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 🔴 Armadilha 5: Status Bar no iOS
No Android, temos `StatusBar.setOverlaysWebView({ overlay: true })`. No iOS, o comportamento é ligeiramente diferente. Verifique se a cor da Status Bar está correta e se o texto (horário, bateria) está legível sobre o fundo escuro do app.

### 🔴 Armadilha 6: Fontes Customizadas
Nossas fontes (`SBL Greek`, `Gentium Plus`) são carregadas via CSS. No iOS WebView (WKWebView), fontes locais funcionam normalmente desde que estejam na pasta `public/assets/fonts/` — o que já é o nosso caso.

### 🔴 Armadilha 7: Haptics
O plugin `@capacitor/haptics` funciona no iOS nativamente, mas a intensidade e os padrões são diferentes do Android. Testar se o feedback tátil está adequado.

### 🟡 Diferença Visual: Scroll Bounce
O iOS tem "bounce" natural no scroll (efeito elástico), enquanto o Android não. Se causar problemas visuais:
```css
/* Desabilitar bounce no iOS se necessário */
html, body {
  overscroll-behavior: none;
}
```

### 🟡 Diferença Visual: Teclado
No iOS, o teclado virtual empurra a view para cima automaticamente. O plugin `@capacitor/keyboard` gerencia isso, mas vale testar em telas com input (Login, Registro).

---

## 8. Deploy para App Store (TestFlight e Produção)

### 8.1 Pré-requisitos
- [x] Conta Apple Developer paga ($99/ano)
- [x] Ícone do app em todos os tamanhos (1024x1024 para App Store)
- [x] Screenshots para iPhone 6.7" e 6.5" (obrigatórios)
- [x] Descrição, palavras-chave, categoria definidas
- [x] Política de Privacidade publicada (URL pública obrigatória)

### 8.2 Preparar o Bundle para Upload

#### Gerar os Ícones
O Xcode exige ícones em múltiplas resoluções. Use uma ferramenta como:
- [appicon.co](https://www.appicon.co/) — faz upload de 1 imagem e gera todos os tamanhos
- Ou via Xcode: Assets.xcassets → AppIcon → arrastar a imagem 1024x1024

#### Configurar Version e Build Number
No Xcode → Target "App" → General:
- **Version**: `1.0.0`
- **Build**: `1` (incrementar a cada upload)

#### Gerar o Archive
1. No Xcode, selecione **"Any iOS Device (arm64)"** como destino
2. Menu → **Product → Archive**
3. Aguarde a compilação (pode levar vários minutos)
4. O **Organizer** abre automaticamente com o archive

### 8.3 Upload para TestFlight
1. No Organizer, clique em **"Distribute App"**
2. Selecione **"App Store Connect"**
3. Escolha **"Upload"**
4. Siga o assistente (aceitar os termos, selecionar certificados)
5. Aguarde o upload e o processamento (10-30 min)
6. Acesse [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
7. Em **TestFlight** → o build aparecerá como "Processing"
8. Após processamento, adicione testadores (internos ou externos)

### 8.4 Submissão para Revisão (App Store)
1. No App Store Connect → **Meu App** → Nova Versão
2. Preencha: Screenshots, Descrição, Categoria, Classificação Etária
3. Selecione o build do TestFlight
4. Clique em **"Enviar para Revisão"**
5. Prazo típico: **24h a 48h** para revisão
6. A Apple pode rejeitar por diversos motivos — veja a seção abaixo

### 8.5 Motivos Comuns de Rejeição pela Apple
| Motivo | Como Evitar |
|--------|-------------|
| **Crash na abertura** | Testar exaustivamente no TestFlight |
| **Login obrigatório sem valor** | Mostrar algo útil antes do login |
| **Sem "Sign in with Apple"** | Se oferecer Google Sign-In, Apple exige o Sign-In com Apple também |
| **Conteúdo incompleto** | Não ter páginas "em breve" ou vazias |
| **Violação de privacidade** | Declarar corretamente o uso de dados no App Privacy |
| **Links quebrados** | Política de Privacidade deve estar online |

> [!CAUTION]
> **Regra crítica da Apple:** Se o seu app oferece login social (Google, Facebook), você é **obrigatoriamente** obrigado a oferecer também o **"Sign in with Apple"**. Precisaremos implementar isso antes de submeter.

---

## 9. Checklist Geral

### Fase 1: Configuração (no Mac)
- [ ] Instalar Xcode + Command Line Tools
- [ ] Instalar CocoaPods (`sudo gem install cocoapods`)
- [ ] Clonar o repositório no Mac
- [ ] `npm install`
- [ ] `npm install @capacitor/ios`
- [ ] `npm run build`
- [ ] `npx cap add ios`
- [ ] `npx cap sync ios`

### Fase 2: Firebase iOS
- [ ] Registrar app iOS no Console Firebase (Bundle ID: `com.berith.koineapp`)
- [ ] Baixar `GoogleService-Info.plist`
- [ ] Adicionar o plist no Xcode (dentro de `ios/App/App/`)
- [ ] Configurar URL Scheme para Google Sign-In
- [ ] Testar login com Google no dispositivo

### Fase 3: Teste no iPhone
- [ ] Conectar iPhone via cabo
- [ ] Configurar Signing no Xcode (Team do Apple ID)
- [ ] Confiar no desenvolvedor no iPhone
- [ ] Rodar o app (`Cmd + R`)
- [ ] Testar todas as telas principais
- [ ] Verificar Safe Area (notch/Dynamic Island)
- [ ] Verificar Status Bar
- [ ] Verificar fontes gregas
- [ ] Verificar banco SQLite carregando
- [ ] Verificar haptics
- [ ] Verificar scroll behavior

### Fase 4: Publicação (quando estiver pronto)
- [ ] Pagar Apple Developer Program ($99/ano)
- [ ] Implementar "Sign in with Apple" (obrigatório)
- [ ] Gerar ícones em todas as resoluções
- [ ] Preparar screenshots para App Store
- [ ] Criar Política de Privacidade (URL pública)
- [ ] Archive no Xcode → Upload para TestFlight
- [ ] Testar via TestFlight com beta testers
- [ ] Submeter para revisão na App Store

---

## 10. Log de Progresso

> Atualize esta seção a cada etapa concluída.

| Data | Fase | Status | Observações |
|------|------|--------|-------------|
| — | Fase 1 | ⬜ Pendente | Aguardando acesso ao Mac |
| — | Fase 2 | ⬜ Pendente | — |
| — | Fase 3 | ⬜ Pendente | — |
| — | Fase 4 | ⬜ Pendente | — |

---

## Recursos Úteis

- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)
- [Firebase iOS Setup](https://firebase.google.com/docs/ios/setup)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Sign in with Apple — Capacitor Plugin](https://github.com/nicklin99/capacitor-apple-login)
