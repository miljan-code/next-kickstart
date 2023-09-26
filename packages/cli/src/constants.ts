import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
export const PKG_ROOT = path.join(path.dirname(__filename), "../");
export const DEFAULT_APP_NAME = "next-kickstart";
export const TITLE_TEXT = ` _   ___      _        _             _   
| | / (_)    | |      | |           | |  
| |/ / _  ___| | _____| |_ __ _ _ __| |_ 
|    \\| |/ __| |/ / __| __/ _' | '__| __|
| |\\  \\ | (__|   <\\__ \\ || (_| | |  | |_ 
\\_| \\_/_|\\___|_|\\_\\___/\\__\\__,_|_|  |___|                           
`;
