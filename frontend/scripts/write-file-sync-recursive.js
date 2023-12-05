import { existsSync, mkdirSync, writeFileSync } from 'fs'

export const writeFileSyncRecursive = (filename, content, charset = 'UTF-8') => {
    let filepath = filename.replace(/\\/g, '/')
    let root = ''

    if (filepath[0] === '/') {
        root = '/'
        filepath = filepath.slice(1)
    } else if (filepath[1] === ':') {
        root = filepath.slice(0, 3)
        filepath = filepath.slice(3)
    }

    const directories = filepath.split('/').slice(0, -1)
    directories.reduce((acc, directory) => {
        const path = acc + directory + '/'
        if (!existsSync(path)) {
            mkdirSync(path)
        }
        return path
    }, root)

    writeFileSync(root + filepath, content, charset)
}
