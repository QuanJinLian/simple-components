export type NullUndefined = null | undefined;

export type LayoutOrient = 'vertical' | 'horizontal';
export type HorizontalAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type GapUnit = '%' | 'px' | 'rem' | 'em';
export type GapProp = `${number}${GapUnit}`;

export type ObjType = {
  [index: string]: any;
};

export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

export type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RGB = `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number},${number},${number},${number})`;
export type HEX = `#${string}`;
type CSSColorName =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'slategrey'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'transparent'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen';

type Globals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';

export type Color = Globals | CSSColorName | RGB | RGBA | HEX | 'transparent';

export type TSetValueAs = string | ObjType | ((arg: any) => any);
export type TCheckCustomValidation = ObjType | ((arg: any) => any);

type PrimitiveType = number | string | boolean;

/** Object types that should never be mapped */
type AtomicObject = (() => any) | ((...args: any[]) => any) | Promise<any> | Date | RegExp;

/**
 * If the lib "ES2015.Collection" is not included in tsconfig.json,
 * types like ReadonlyArray, WeakMap etc. fall back to `any` (specified nowhere)
 * or `{}` (from the node types), in both cases entering an infinite recursion in
 * pattern matching type mappings
 * This type can be used to cast these types to `void` in these cases.
 */
export type IfAvailable<T, Fallback = void> =
  // fallback if any
  true | false extends (T extends never ? true : false)
    ? Fallback // fallback if empty type
    : keyof T extends never
    ? Fallback // original type
    : T;

/**
 * These should also never be mapped but must be tested after regular Map and
 * Set
 */
type WeakReferences = IfAvailable<WeakMap<any, any>> | IfAvailable<WeakSet<any>>;

export type WritableDraft<T> = { -readonly [K in keyof T]: Draft<T[K]> };

/** Convert a readonly type into a mutable type, if possible */
export type Draft<T> = T extends PrimitiveType
  ? T
  : T extends AtomicObject
  ? T
  : T extends IfAvailable<ReadonlyMap<infer K, infer V>> // Map extends ReadonlyMap
  ? Map<Draft<K>, Draft<V>>
  : T extends IfAvailable<ReadonlySet<infer V>> // Set extends ReadonlySet
  ? Set<Draft<V>>
  : T extends WeakReferences
  ? T
  : T extends object
  ? WritableDraft<T>
  : T;

export type TimeUnit = 's' | 'm' | 'h' | 'd' | 'w';
export type TimeUnitFull = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'year';

export type IntervalTimeout = number | `${number}${TimeUnit}`;

export type EnumType<T extends Record<string, any>> = T[keyof T];
