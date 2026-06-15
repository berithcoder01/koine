// src/content/curriculum/units.ts
// Pure pedagogical data — 34 modules × 3 units = 102 learning units across
// 4 active cycles. No DB calls, no async. The corresponding DB seed
// lives in src/features/database/seeds/seedLearningUnits.ts and reads from
// the LEARNING_UNITS array exported here.
//
// All modules are generated from WikiProjeto/Modulos/{ID}.apostila.md
// via `npm run parse-apostila`.

import { C1M01_UNITS } from './generated/C1-M01.generated';
import { C1M02_UNITS } from './generated/C1-M02.generated';
import { C1M03_UNITS } from './generated/C1-M03.generated';
import { C1M04_UNITS } from './generated/C1-M04.generated';
import { C1M05_UNITS } from './generated/C1-M05.generated';
import { C1M06_UNITS } from './generated/C1-M06.generated';
import { C1M07_UNITS } from './generated/C1-M07.generated';
import { C1M08_UNITS } from './generated/C1-M08.generated';
import { C1M09_UNITS } from './generated/C1-M09.generated';
import { C1M10_UNITS } from './generated/C1-M10.generated';
import { C2M01_UNITS } from './generated/C2-M01.generated';
import { C2M02_UNITS } from './generated/C2-M02.generated';
import { C2M03_UNITS } from './generated/C2-M03.generated';
import { C2M04_UNITS } from './generated/C2-M04.generated';
import { C2M05_UNITS } from './generated/C2-M05.generated';
import { C2M06_UNITS } from './generated/C2-M06.generated';
import { C2M07_UNITS } from './generated/C2-M07.generated';
import { C2M08_UNITS } from './generated/C2-M08.generated';
import { C3M01_UNITS } from './generated/C3-M01.generated';
import { C3M02_UNITS } from './generated/C3-M02.generated';
import { C3M03_UNITS } from './generated/C3-M03.generated';
import { C3M04_UNITS } from './generated/C3-M04.generated';
import { C3M05_UNITS } from './generated/C3-M05.generated';
import { C3M06_UNITS } from './generated/C3-M06.generated';
import { C3M07_UNITS } from './generated/C3-M07.generated';
import { C3M08_UNITS } from './generated/C3-M08.generated';
import { C4M01_UNITS } from './generated/C4-M01.generated';
import { C4M02_UNITS } from './generated/C4-M02.generated';
import { C4M03_UNITS } from './generated/C4-M03.generated';
import { C4M04_UNITS } from './generated/C4-M04.generated';
import { C4M05_UNITS } from './generated/C4-M05.generated';
import { C4M06_UNITS } from './generated/C4-M06.generated';
import { C4M07_UNITS } from './generated/C4-M07.generated';
import { C4M08_UNITS } from './generated/C4-M08.generated';
import { C5M01_UNITS } from './generated/C5-M01.generated';
import { C5M02_UNITS } from './generated/C5-M02.generated';
import { C5M03_UNITS } from './generated/C5-M03.generated';
import { C5M04_UNITS } from './generated/C5-M04.generated';
import { C5M05_UNITS } from './generated/C5-M05.generated';
import { C5M06_UNITS } from './generated/C5-M06.generated';
import { C5M07_UNITS } from './generated/C5-M07.generated';
import { C5M08_UNITS } from './generated/C5-M08.generated';

export interface UnitRow {
  id: string;
  module_id: string;
  unit_order: number;
  unit_type: string;
  greek_form: string;
  transliteration: string;
  gloss_pt: string;
  phonetic_sound: string;
  explanation: string;
  mnemonic_hint: string;
  context_verse: string;
  context_reference: string;
  srs_key: string;
  phase2_data: string;
  phase3_data: string;
  phase4_data: string;
  phase5_data: string;
}

export const LEARNING_UNITS: UnitRow[] = [
  ...C1M01_UNITS, ...C1M02_UNITS, ...C1M03_UNITS, ...C1M04_UNITS, ...C1M05_UNITS,
  ...C1M06_UNITS, ...C1M07_UNITS, ...C1M08_UNITS, ...C1M09_UNITS, ...C1M10_UNITS,
  ...C2M01_UNITS, ...C2M02_UNITS, ...C2M03_UNITS, ...C2M04_UNITS, ...C2M05_UNITS,
  ...C2M06_UNITS, ...C2M07_UNITS, ...C2M08_UNITS,
  ...C3M01_UNITS, ...C3M02_UNITS, ...C3M03_UNITS, ...C3M04_UNITS, ...C3M05_UNITS,
  ...C3M06_UNITS, ...C3M07_UNITS, ...C3M08_UNITS,
  ...C4M01_UNITS, ...C4M02_UNITS, ...C4M03_UNITS, ...C4M04_UNITS, ...C4M05_UNITS,
  ...C4M06_UNITS, ...C4M07_UNITS, ...C4M08_UNITS,
  ...C5M01_UNITS, ...C5M02_UNITS, ...C5M03_UNITS, ...C5M04_UNITS, ...C5M05_UNITS,
  ...C5M06_UNITS, ...C5M07_UNITS, ...C5M08_UNITS,
];

export const UNITS_BY_MODULE: Record<string, UnitRow[]> = LEARNING_UNITS.reduce(
  (acc, u) => {
    if (!acc[u.module_id]) acc[u.module_id] = [];
    acc[u.module_id].push(u);
    return acc;
  },
  {} as Record<string, UnitRow[]>,
);

export const getUnitsByModule = (moduleId: string): UnitRow[] =>
  UNITS_BY_MODULE[moduleId] ?? [];
