import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const YAML_CONFIG_FILENAME = 'config.yml';

export default (): Record<string, any> => {
  return yaml.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as Record<
    string,
    any
  >;
};
