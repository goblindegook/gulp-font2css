import fs from 'fs'
import path from 'path'
import test from 'ava'
import css from 'css'
import util from 'gulp-util'
import font2css from '../src'

// HELPER FUNCTIONS

/**
 * Create file object for testing.
 * @param  {String} filepath File path.
 * @param  {String} contents File contents (optional, defaults to empty).
 * @return {Object}          File object.
 */
function createFile(filepath, contents = '') {
  return new util.File({
    base:     path.dirname(filepath),
    path:     filepath,
    contents: new Buffer(contents),
  })
}

/**
 * Get generated @font-face property for testing.
 * @param  {String} styles   Generated stylesheet contents.
 * @param  {String} property Propery name.
 * @return {String}          Property value.
 */
function getProperty(styles, property) {
  const ast = css.parse(styles)
  return ast.stylesheet.rules[0].declarations
    .reduce((prev, item) => item.property === property ? item.value : prev, '')
}

// BEFORE & AFTER HOOKS

test.beforeEach(t => {
  t.context.stream = font2css()
})

// TESTS

test.cb('encodes font files to CSS', t => {
  const inputPath    = path.join(__dirname, '/fixtures/testfont.woff')
  const expectedPath = path.join(__dirname, '/fixtures/testfont.css')
  const input        = fs.readFileSync(inputPath, 'utf8')
  const expected     = fs.readFileSync(expectedPath, 'utf8')

  t.context.stream.on('data', file => {
    t.is(String(file.contents), expected)
    t.end()
  })

  t.context.stream.write(createFile(inputPath, input))
})

test.cb('determines font-family', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-family'), '"test"')
    t.end()
  })

  t.context.stream.write(createFile('test.woff'))
})

test.cb('determines font-style', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-style'), 'italic')
    t.end()
  })

  t.context.stream.write(createFile('test-italic.woff'))
})

test.cb('determines font-weight', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-weight'), '700')
    t.end()
  })

  t.context.stream.write(createFile('test-700.woff'))
})

test.cb('determines font-weight from keyword', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-weight'), '700')
    t.end()
  })

  t.context.stream.write(createFile('test-bold.woff'))
})

test.cb('determines font-style and font-weight', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-style'), 'italic')
    t.is(getProperty(String(file.contents), 'font-weight'), '700')
    t.end()
  })

  t.context.stream.write(createFile('test-bold-italic.woff'))
})

test.cb('determines font-style and font-weight with normal', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-style'), 'normal')
    t.is(getProperty(String(file.contents), 'font-weight'), '400')
    t.end()
  })

  t.context.stream.write(createFile('test-normal-400.woff'))
})

test.cb('determines font-style and font-weight with normal (inverted order)', t => {
  t.context.stream.on('data', file => {
    t.is(getProperty(String(file.contents), 'font-style'), 'normal')
    t.is(getProperty(String(file.contents), 'font-weight'), '400')
    t.end()
  })

  t.context.stream.write(createFile('test-400-normal.woff'))
})
