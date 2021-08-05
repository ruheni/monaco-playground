import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}
type EditorConfig = monaco.editor.IStandaloneEditorConstructionOptions

const defaultConfig: EditorConfig = {
  language: "typescript",
  lineNumbers: "on",
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: "vs-light",
}

const codeSample = `
const colors = ['blue', 'black', 'white', 'yellow', 'orange'] as const

type color = (typeof colors)[number]
`.trim()

const Editor: React.FC = () => {
  const [code, setCode] = useState(codeSample)

  const [config, setConfig] = useState({
    value: code,
    ...defaultConfig
  })

  const ref = useRef<HTMLPreElement>(null)
  let editor: monaco.editor.IStandaloneCodeEditor;

  useEffect(() => {
    ref.current && monaco.editor.create(ref.current, config)

    return () => editor.dispose()
  }, [])

  return <pre ref={ref} style={{ height: '100vh' }}></pre>
}

export default Editor;
