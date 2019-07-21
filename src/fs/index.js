/* eslint-disable */

const F = {};
const L = {};
const C = {};
const nothing = Symbol("[MONAD|nothing]");

F.noop = () => {};
L.noop = function*() {};

F.identity = a => a;

F.not = a => !a;

F.constant = a => _ => a;

F.maybe = f => a => (a == null || a === nothing ? a : f(a));

F.curry = f => (a, ...bs) => (bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs));

F.tryCatch = (exec, fallback, ...args) => {
  try {
    return exec(...args);
  } catch (error) {
    return fallback(error, ...args);
  }
};

const baseGet = (selector, obj) => {
  if (typeof selector === "string") {
    let result = obj;
    for (const sel of selector.split(/\s*->\s*/)) {
      result = result[sel];
    }
    return result;
  }

  return obj[selector];
};
F.getLeft = F.curry((obj, selector) =>
  F.tryCatch(baseGet, F.noop, selector, obj)
);
F.getRight = F.curry((selector, obj) =>
  F.tryCatch(baseGet, F.noop, selector, obj)
);

F.setLeft = F.curry((obj, [k, v]) => ((obj[k] = v), obj));
F.setRight = F.curry(([k, v], obj) => ((obj[k] = v), obj));
const baseImSet = (selector, obj, value) => {
  if (typeof selector === "string") {
    const sels = selector.split(/\s*->\s*/);
    const last = sels.pop();
    const clone = Array.isArray(obj) ? obj.slice() : Object.assign({}, obj);

    let prev = clone;
    for (const sel of sels) {
      const cur = prev[sel];
      const clone = Array.isArray(cur) ? cur.slice() : Object.assign({}, cur);
      F.setLeft(prev, [sel, clone]);
      prev = clone;
    }

    F.setLeft(prev, [last, value]);
    return clone;
  }

  const clone = Array.isArray(obj) ? obj.slice() : Object.assign({}, obj);
  F.setLeft(clone, [selector, value]);
  return clone;
};
F.imSetLeft = F.curry((obj, [selector, value]) =>
  F.tryCatch(baseImSet, F.constant(obj), selector, obj, value)
);
F.imSetRight = F.curry(([selector, value], obj) =>
  F.tryCatch(baseImSet, F.constant(obj), selector, obj, value)
);
const baseMSet = (selector, obj, value) => {
  if (typeof selector === "string") {
    const sels = selector.split(/\s*->\s*/);
    const last = sels.pop();

    let prev = obj;
    for (const sel of sels) prev = prev[sel];

    prev[last] = value;

    return obj;
  }

  obj[selector] = value;
  return obj;
};
F.mSetLeft = F.curry((obj, [selector, value]) =>
  F.tryCatch(baseMSet, F.constant(obj), selector, obj, value)
);
F.mSetRight = F.curry(([selector, value], obj) =>
  F.tryCatch(baseMSet, F.constant(obj), selector, obj, value)
);

F.isNullable = v => v == null;
F.isIterable = iter =>
  !F.isNullable(iter) && typeof iter[Symbol.iterator] === "function";
F.isIterableExceptString = iter =>
  F.isIterable(iter) && typeof iter !== "string";
F.toIter = iter => (F.isIterable(iter) ? iter[Symbol.iterator]() : L.noop());
L.singleToIter = function*(v) {
  if (F.isIterableExceptString(v)) yield* v[Symbol.iterator]();
  else yield v;
};

const baseDelete = (obj, selector) => {
  if (typeof selector === "string") {
    const sels = selector.split(/\s*->\s*/);
    const last = sels.pop();
    const clone = Array.isArray(obj) ? obj.slice() : Object.assign({}, obj);

    let prev = clone;
    for (const sel of sels) {
      const cur = prev[sel];
      const clone = Array.isArray(cur) ? cur.slice() : Object.assign({}, cur);
      F.setLeft(prev, [sel, clone]);
      prev = clone;
    }

    delete prev[last];
    return clone;
  }

  const clone = Array.isArray(obj) ? obj.slice() : Object.assign({}, obj);
  delete clone[selector];
  return clone;
};
const baseDeleteMultiple = (obj, selectors) => {
  if (F.isIterableExceptString(selectors)) {
    for (const selector of selectors) obj = baseDelete(obj, selector);
    return obj;
  }

  return baseDelete(obj, selectors);
};
F.deleteLeft = F.curry((obj, selectors) =>
  F.tryCatch(baseDeleteMultiple, F.constant(obj), obj, selectors)
);
F.deleteRight = F.curry((selectors, obj) =>
  F.tryCatch(baseDeleteMultiple, F.constant(obj), obj, selectors)
);

F.callLeft = F.curry((f, a) => f(a));
F.callRight = F.curry((a, f) => f(a));

F.thenLeft = F.curry((f, a) => (a instanceof Promise ? a.then(f) : f(a)));
F.thenRight = F.curry((a, f, g) =>
  a instanceof Promise ? a.then(f, g) : f(a)
);

F.catchLeft = F.curry((f, a) => (a instanceof Promise ? a.catch(f) : a));
F.catchRight = F.curry((a, f) => (a instanceof Promise ? a.catch(f) : a));

F.catchNoop = ([...arr]) => (
  arr.forEach(a => (a instanceof Promise ? a.catch(F.noop) : a)), arr
);

L.take = F.curry(function*(l, iter) {
  iter = F.toIter(iter);

  let cur;
  while (l && !(cur = iter.next()).done) {
    const a = cur.value;
    if (a instanceof Promise) yield a.then(a => (--l, a));
    else yield (--l, a);
  }
});
F.take = F.curry((l, iter) => {
  iter = L.take(l, iter);

  const res = [];

  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;

      if (a instanceof Promise)
        return a
          .then(a => (res.push(a), recur()))
          .catch(error =>
            error === nothing ? recur() : Promise.reject(error)
          );

      res.push(a);
    }
    return res;
  })();
});
C.take = F.curry((l, iter) => F.take(l, F.catchNoop(iter)));

L.takeAll = L.take(Infinity);
F.takeAll = F.take(Infinity);
C.takeAll = C.take(Infinity);

F.takeHead = iter => F.thenRight(F.take(1, iter), ([h]) => h);

const reduceF = (f, acc, cur) =>
  cur instanceof Promise
    ? cur
        .then(cur => f(acc, cur))
        .catch(error => (error === nothing ? acc : Promise.reject(error)))
    : f(acc, cur);
F.reduce = F.curry((f, acc, iter) => {
  if (!iter) return F.reduce(f, F.takeHead((iter = F.toIter(acc))), iter);

  iter = F.toIter(iter);

  return F.thenRight(
    acc,
    function recur(acc) {
      let cur;
      while (!(cur = iter.next()).done) {
        acc = reduceF(f, acc, cur.value);
        if (acc instanceof Promise) return acc.then(recur);
      }
      return acc;
    },
    error =>
      error === nothing
        ? F.reduce(f, F.takeHead(iter), iter)
        : Promise.reject(error)
  );
});
C.reduce = F.curry((f, acc, iter) =>
  iter ? F.reduce(f, acc, F.catchNoop(iter)) : F.reduce(f, F.catchNoop(acc))
);

F.go = (a, ...fs) => (fs.length ? F.reduce(F.callRight, a, fs) : a);

F.pipe = (f, ...fs) => (...args) => (!f ? args : F.go(f(...args), ...fs));

L.takeWhile = F.curry(function*(f, iter) {
  iter = F.toIter(iter);

  let ok = false;
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    ok = F.thenLeft(f, a);
    if (ok instanceof Promise)
      yield ok.then(_ok => ((ok = _ok) ? a : Promise.reject(nothing)));
    else if (ok) yield a;
    if (!ok) break;
  }
});
F.takeWhile = F.curry(
  F.pipe(
    L.takeWhile,
    F.takeAll
  )
);
C.takeWhile = F.curry((f, iter) => F.takeWhile(f, F.catchNoop(iter)));

F.tap = (...fs) => a => F.go(a, ...fs, _ => a);
C.tap = (...fs) => a => (F.go(a, ...fs), a);

F.each = F.curry((f, iter) =>
  F.thenRight(F.reduce((_, a) => f(a), null, iter), _ => iter)
);
C.each = F.curry((f, iter) => F.each(f, F.catchNoop(iter)));

L.map = F.curry(function*(f, iter) {
  for (const a of F.toIter(iter)) yield F.thenLeft(f, a);
});
F.map = F.curry(
  F.pipe(
    L.map,
    F.takeAll
  )
);
C.map = F.curry(
  F.pipe(
    L.map,
    C.takeAll
  )
);

const baseAll = map => (...fs) => (...args) => map(f => f(...args), fs);
L.all = baseAll(L.map);
F.all = baseAll(F.map);
C.all = baseAll(C.map);

L.filter = F.curry(function*(f, iter) {
  for (const a of F.toIter(iter)) {
    const b = F.thenRight(a, f);
    if (b instanceof Promise)
      yield b.then(b => (b ? a : Promise.reject(nothing)));
    else if (b) yield a;
  }
});
F.filter = F.curry(
  F.pipe(
    L.filter,
    F.takeAll
  )
);
C.filter = F.curry(
  F.pipe(
    L.filter,
    C.takeAll
  )
);

F.find = F.curry(
  F.pipe(
    L.filter,
    F.takeHead
  )
);

L.reject = F.curry((f, iter) =>
  L.filter(
    F.pipe(
      f,
      F.not
    ),
    iter
  )
);
F.reject = F.curry(
  F.pipe(
    L.reject,
    F.takeAll
  )
);
C.reject = F.curry(
  F.pipe(
    L.reject,
    C.takeAll
  )
);

L.baseFlat = F.curry(function*(f, iter) {
  for (const a of F.toIter(iter)) {
    if (F.isIterableExceptString(a)) yield* f(a);
    else yield a;
  }
});
F.baseFlat = F.curry(
  F.pipe(
    L.baseFlat,
    F.takeAll
  )
);

L.flatten = L.baseFlat(F.identity);
F.flatten = F.baseFlat(F.identity);

L.deepFlat = L.baseFlat(L.deepFlat);
F.deepFlat = F.pipe(
  L.deepFlat,
  F.takeAll
);

L.flatMap = F.curry(
  F.pipe(
    L.map,
    L.flatten
  )
);
F.flatMap = F.curry(
  F.pipe(
    L.flatMap,
    F.takeAll
  )
);

L.concat = (...iters) => L.flatten(iters);
F.concat = F.pipe(
  L.concat,
  F.takeAll
);

L.entries = function*(obj) {
  for (const k in obj) if (obj.hasOwnProperty(k)) yield [k, obj[k]];
};
F.entries = F.pipe(
  L.entries,
  F.takeAll
);

L.mapObject = F.curry(function*(f, obj) {
  const iter = L.entries(obj);

  for (const [k, v] in iter) yield f(v, k, obj);
});
F.mapObject = F.curry((f, obj) => {
  const iter = L.entries(obj);

  const res = {};

  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const [k, v] = cur.value;
      const a = f(v, k, obj);

      if (a instanceof Promise)
        return a
          .then(a => {
            res[k] = a;
            return recur();
          })
          .catch(error =>
            error === nothing ? recur() : Promise.reject(error)
          );

      res[k] = a;
    }
    return res;
  })();
});

L.values = L.mapObject(F.identity);
F.values = F.pipe(
  L.values,
  F.takeAll
);

L.keys = L.mapObject(([v, k]) => k);
F.keys = F.pipe(
  L.keys,
  F.takeAll
);

L.valueIndex = function*(iter) {
  let i = -1;

  for (const a of F.toIter(iter)) yield [a, ++i];
};

F.trampoline = (f, ...args) => {
  if (typeof f !== "function") return f;

  let result = f(...args);

  while (typeof result === "function") result = result();

  return result;
};

export { F, L, C, nothing };
