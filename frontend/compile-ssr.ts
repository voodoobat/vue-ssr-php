import { compile2js } from './scripts/compile2js'
const components = ['./src/components/Greeting.vue']

components.forEach(compile2js)
