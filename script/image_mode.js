class ImageMode {
  constructor(name) {
    this.name = name;

    // 静的マップに登録
    ImageMode._nameMap.set(name, this);
    ImageMode._all.push(this);
  }

  static _nameMap = new Map();
  static _all = [];

  static values() {
    return ImageMode._all;
  }

  static fromName(name) {
    return ImageMode._nameMap.get(name);
  }

  toString() {
    return this.name;
  }
}

// 定義
/**
 * 組織的ディザリングを使わないモード
 */
ImageMode.NORMAL = new ImageMode("NORMAL");

/**
 * 3x3組織的ディザリング(Default)
 */
ImageMode.MODE3x3 = new ImageMode("MODE3x3");

/**
 * 4x4組織的ディザリング
 */
ImageMode.MODE4x4 = new ImageMode("MODE4x4");
