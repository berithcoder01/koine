# Plano: Destravar C3 e C4 na TrailPage

## Problema
A TrailPage só carrega e renderiza C1 e C2. C3 está hardcoded como bloqueado e C4 não existe na UI.

## Arquivo Principal
`src/ui/pages/trail/TrailPage.tsx` (420 linhas)

## Mudanças Necessárias

### 1. Import (linha 21)
```tsx
// ATUAL:
import { CYCLE_1_UNIT_GROUPS, CYCLE_2_UNIT_GROUPS, type UnitGroup } from '@/content/curriculum/unit-groups';

// NOVO:
import { CYCLE_1_UNIT_GROUPS, CYCLE_2_UNIT_GROUPS, CYCLE_3_UNIT_GROUPS, CYCLE_4_UNIT_GROUPS, type UnitGroup } from '@/content/curriculum/unit-groups';
```

### 2. Aliases (linhas 83-84)
```tsx
// ADICIONAR após line 84:
const CYCLE_3_UNITS: UnitGroup[] = CYCLE_3_UNIT_GROUPS;
const CYCLE_4_UNITS: UnitGroup[] = CYCLE_4_UNIT_GROUPS;
```

### 3. loadData() (linhas 132-151)
```tsx
// ATUAL: busca apenas C1 e C2
const c1 = await dbQueries.getModulesByCycle(1);
const c2 = await dbQueries.getModulesByCycle(2);

// NOVO: buscar todos os 4 ciclos
const c1 = await dbQueries.getModulesByCycle(1);
const c2 = await dbQueries.getModulesByCycle(2);
const c3 = await dbQueries.getModulesByCycle(3);
const c4 = await dbQueries.getModulesByCycle(4);
if (c1.length > 0 || c2.length > 0 || c3.length > 0 || c4.length > 0) {
  setModules([...c1, ...c2, ...c3, ...c4]);
}
```

### 4. getModuleStatus() (linhas 153-174)
Generalizar para suportar qualquer ciclo (não hardcoded):

```tsx
const getModuleStatus = useCallback((moduleId: string): NodeStatus => {
  const completedKeys = Object.keys(completedLessons);
  if (completedKeys.includes(moduleId)) return 'complete';

  const module = modules.find(m => m.id === moduleId);
  if (!module) return 'locked';

  // C1-M00 e C1-M01 sempre disponíveis
  if (module.cycle_id === 1 && module.module_order <= 1) return 'available';

  // Primeiro módulo de qualquer ciclo: requer conclusão do último do ciclo anterior
  if (module.module_order === 1) {
    const prevCycle = module.cycle_id - 1;
    const prevCycleModules = modules.filter(m => m.cycle_id === prevCycle);
    const lastModule = prevCycleModules.sort((a, b) => b.module_order - a.module_order)[0];
    if (lastModule && completedKeys.includes(lastModule.id)) return 'available';
    return 'locked';
  }

  // Demais módulos: requer o anterior do mesmo ciclo
  const prefix = `C${module.cycle_id}-M`;
  const prevModuleId = `${prefix}${String(module.module_order - 1).padStart(2, '0')}`;
  if (completedKeys.includes(prevModuleId)) return 'available';
  return 'locked';
}, [completedLessons, modules]);
```

### 5. Filtros de ciclo (após linha 178)
```tsx
// ADICIONAR:
const cycle3 = modules.filter(m => m.cycle_id === 3);
const cycle4 = modules.filter(m => m.cycle_id === 4);
```

### 6. Renderização (linhas 383-387)
Substituir o card estático de C3 por renderização dinâmica e adicionar C4:

```tsx
{/* ── CICLO III ──────────────────────────────────────── */}
<div className="w-full">
  {renderBanner('Ciclo III: Substantivos e Artigos', 'Domine as declinações, casos gregos e preposições — a espinha dorsal da gramática.')}
  <div className="mt-5">
    {cycle3.length === 0 ? (
      <div className="w-full text-center py-6">
        <p className="text-text-secondary text-xs">Complete o Ciclo II para desbloquear</p>
      </div>
    ) : (
      renderUnitGrid(CYCLE_3_UNITS, cycle3)
    )}
  </div>
</div>

{/* ── CICLO IV ──────────────────────────────────────── */}
<div className="w-full">
  {renderBanner('Ciclo IV: Verbos — Presente e Movimento', 'Conjugação completa, verbos de movimento, contratos e a voz média.')}
  <div className="mt-5">
    {cycle4.length === 0 ? (
      <div className="w-full text-center py-6">
        <p className="text-text-secondary text-xs">Complete o Ciclo III para desbloquear</p>
      </div>
    ) : (
      renderUnitGrid(CYCLE_4_UNITS, cycle4)
    )}
  </div>
</div>
```

## Fluxo Resultante

```
C1-M00 → C1-M01 → ... → C1-M10 → C2-M01 → ... → C2-M08 → C3-M01 → ... → C3-M08 → C4-M01 → ... → C4-M08
         sempre       sequencial    gate:       sequencial    gate:       sequencial    gate:       sequencial
         disponível               C1-M10       por módulo    C2-M08      por módulo    C3-M08      por módulo
```

## Verificação
1. `npx tsc --noEmit` — zero erros
2. Testar na app: completar C1-M10 → C2-M01 deve desbloquear
3. Testar na app: completar C2-M08 → C3-M01 deve desbloquear
4. Testar na app: completar C3-M08 → C4-M01 deve desbloquear
5. Verificar que módulos bloqueados mostram 🔒 e não navegam
