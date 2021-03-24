import { ENUM } from "sequelize";

export const Difficulty = ENUM("1", "2", "3", "4", "5");
export type TDifficulty = 1 | 2 | 3 | 4 | 5;
