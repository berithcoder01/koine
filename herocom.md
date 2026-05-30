# Quick Start

Get started with HeroUI Native in minutes

## [Getting Started](https://heroui.com/en/docs/native/getting-started/quick-start#getting-started)

### [1. Install HeroUI Native](https://heroui.com/en/docs/native/getting-started/quick-start#1-install-heroui-native)

npmpnpmyarnbun

```
npm install heroui-native
```

### [2. Install Mandatory Peer Dependencies](https://heroui.com/en/docs/native/getting-started/quick-start#2-install-mandatory-peer-dependencies)

npmpnpmyarnbun

```
npm install react-native-reanimated@^4.1.1 react-native-gesture-handler@^2.28.0 react-native-worklets@^0.5.1 react-native-safe-area-context@^5.6.0 react-native-svg@^15.12.1 tailwind-variants@^3.2.2 tailwind-merge@^3.4.0
```



It's recommended to use the exact versions specified above to avoid compatibility issues. Version mismatches may cause unexpected bugs.

### [3. Optional Dependencies](https://heroui.com/en/docs/native/getting-started/quick-start#3-optional-dependencies)

These packages are only needed if you use specific components or features:

| Package                | Version   | Required for                                                 |
| ---------------------- | --------- | ------------------------------------------------------------ |
| `react-native-screens` | `^4.16.0` | BottomSheet, Dialog, Menu, Popover, Select, Toast            |
| `@gorhom/bottom-sheet` | `^5.2.9`  | BottomSheet, Menu / Popover / Select when `presentation="bottom-sheet"` |

### [4. Set Up Uniwind](https://heroui.com/en/docs/native/getting-started/quick-start#4-set-up-uniwind)

Follow the [Uniwind installation guide](https://docs.uniwind.dev/quickstart) to set up Tailwind CSS for React Native.

If you're migrating from NativeWind, see the [migration guide](https://docs.uniwind.dev/migration-from-nativewind).

### [5. Configure global.css](https://heroui.com/en/docs/native/getting-started/quick-start#5-configure-globalcss)

Inside your `global.css` file add the following imports:

```
@import 'tailwindcss';@import 'uniwind';@import 'heroui-native/styles';/* Path to the heroui-native lib inside node_modules relative to global.css *//* Examples: *   - If global.css is at project root: ./node_modules/heroui-native/lib *   - If global.css is in app/: ../node_modules/heroui-native/lib *   - If global.css is in src/styles/: ../../node_modules/heroui-native/lib */@source './node_modules/heroui-native/lib';
```

### [6. Wrap Your App with Provider](https://heroui.com/en/docs/native/getting-started/quick-start#6-wrap-your-app-with-provider)

Wrap your application with `HeroUINativeProvider`. You must wrap it with `GestureHandlerRootView`:

```
import { HeroUINativeProvider } from 'heroui-native';import { GestureHandlerRootView } from 'react-native-gesture-handler';export default function App() {  return (    <GestureHandlerRootView style={{ flex: 1 }}>      <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>    </GestureHandlerRootView>  );}
```

> **Note**: For advanced configuration options including text props, animation settings, and toast configuration, see the [Provider documentation](https://heroui.com/en/docs/native/getting-started/provider).

### [7. Use Your First Component](https://heroui.com/en/docs/native/getting-started/quick-start#7-use-your-first-component)

```
import { Button } from 'heroui-native';import { View } from 'react-native';export default function MyComponent() {  return (    <View className="flex-1 justify-center items-center bg-background">      <Button onPress={() => console.log('Pressed!')}>Get Started</Button>    </View>  );}
```

### [8. Reduce Bundle Size with Granular Exports](https://heroui.com/en/docs/native/getting-started/quick-start#8-reduce-bundle-size-with-granular-exports)

If you want to reduce bundle size and import only the components you need, our library provides granular exports for each component:

```
// Granular imports - use when you need only a few componentsimport { HeroUINativeProvider } from "heroui-native/provider";import { Button } from "heroui-native/button";import { Card } from "heroui-native/card";// General import - imports the whole library, use when you're using many componentsimport { Button, Card } from "heroui-native";
```

Granular imports are ideal when you only need a few components, as they help keep your bundle size smaller. General imports from `heroui-native` will include the entire library, which is convenient when you're using many components throughout your app.

**Available granular exports:**

- `heroui-native/provider` - Provider component
- `heroui-native/provider-raw` - Lightweight provider (keeps bare minimum to start)
- `heroui-native/[component-name]` - Individual components
- `heroui-native/portal` - Portal utilities
- `heroui-native/toast` - Toast provider and utilities
- `heroui-native/utils` - Utility functions
- `heroui-native/hooks` - Custom hooks



**Important**: To keep the bundle size under control, you must follow the pattern with granular imports consistently. Even one general import from `heroui-native` will break this optimization strategy.

> **Tip**: For even more control over your bundle, consider using [`HeroUINativeProviderRaw`](https://heroui.com/en/docs/native/getting-started/provider#raw-provider) — a lightweight provider that excludes `ToastProvider` and `PortalHost`.