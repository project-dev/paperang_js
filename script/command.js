class Command {
  constructor(val, name) {
    this.val = val;
    this.name = name;

    // 登録（静的マップへ）
    Command._valueMap.set(val, this);
    Command._nameMap.set(name, this);
    Command._all.push(this);
  }

  static _valueMap = new Map();
  static _nameMap = new Map();
  static _all = [];

  static getCommand(val) {
    if (!Command._valueMap.has(val)) {
      throw new Error("not found");
    }
    return Command._valueMap.get(val);
  }

  static getCommandAtName(name) {
    return Command._nameMap.get(name) || Command.MAX_CMD;
  }

  static values() {
    return Command._all;
  }
}

// コマンド定義（必要に応じて省略可）
/**
 * 画像を印刷
 */
Command.PRINT_DATA = new Command(0x00, "PRINT_DATA");

/**
 * 動作未確認
 */
Command.PRINT_DATA_COMPRESS = new Command(0x01, "PRINT_DATA_COMPRESS");

/**
 * 動作未確認
 */
Command.FIRMWARE_DATA = new Command(0x02, "FIRMWARE_DATA");

/**
 * 動作未確認
 */
Command.USB_UPDATE_FIRMWARE = new Command(0x03, "USB_UPDATE_FIRMWARE");

/**
 * バージョンを取得
 */
Command.GET_VERSION = new Command(0x04, "GET_VERSION");

/**
 * 動作未確認
 */
Command.SENT_VERSION = new Command(0x05, "SENT_VERSION");

/**
 * モデルを取得
 */
Command.GET_MODEL = new Command(0x06, "GET_MODEL");

/**
 * 動作未確認
 */
Command.SENT_MODEL = new Command(0x07, "SENT_MODEL");

/**
 * MACアドレスを取得
 */
Command.GET_BT_MAC = new Command(0x08, "GET_BT_MAC");

/**
 * 動作未確認
 */
Command.SENT_BT_MAC = new Command(0x09, "SENT_BT_MAC");

/**
 * シリアルナンバーを取得
 */
Command.GET_SN = new Command(0x0A, "GET_SN");

/**
 * 動作未確認
 */
Command.SENT_SN = new Command(0x0B, "SENT_SN");

/**
 * ステータスを取得
 */
Command.GET_STATUS = new Command(0x0C, "GET_STATUS");

/**
 * 動作未確認
 */
Command.SENT_STATUS = new Command(0x0D, "SENT_STATUS");

/**
 * 動作未確認
 */
Command.GET_VOLTAGE = new Command(0x0E, "GET_VOLTAGE");

/**
 * 動作未確認
 */
Command.SENT_VOLTAGE = new Command(0x0F, "SENT_VOLTAGE");

/**
 * 動作未確認
 */
Command.GET_BAT_STATUS = new Command(0x10, "GET_BAT_STATUS");

/**
 * 動作未確認
 */
Command.SENT_BAT_STATUS = new Command(0x11, "SENT_BAT_STATUS");

/**
 * 動作未確認
 */
Command.GET_TEMP = new Command(0x12, "GET_TEMP");

/**
 * 動作未確認
 */
Command.SENT_TEMP = new Command(0x13, "SENT_TEMP");

/**
 * 動作未確認
 */
Command.SET_FACTORY_STATUS = new Command(0x14, "SET_FACTORY_STATUS");

/**
 * 動作未確認
 */
Command.GET_FACTORY_STATUS = new Command(0x15, "GET_FACTORY_STATUS");

/**
 * 動作未確認
 */
Command.SENT_FACTORY_STATUS = new Command(0x16, "SENT_FACTORY_STATUS");

/**
 * 動作未確認
 */
Command.SENT_BT_STATUS = new Command(0x17, "SENT_BT_STATUS");

/**
 * CRC Keyを設定
 */
Command.SET_CRC_KEY = new Command(0x18, "SET_CRC_KEY");

/**
 * 動作未確認
 */
Command.SET_HEAT_DENSITY = new Command(0x19, "SET_HEAT_DENSITY");

/**
 * 紙送り
 * 
 * データ 2byte 送る行数を指定する
 */
Command.FEED_LINE = new Command(0x1A, "FEED_LINE");

/**
 * テストページを印刷
 */
Command.PRINT_TEST_PAGE = new Command(0x1B, "PRINT_TEST_PAGE");

/**
 * 動作未確認
 */
Command.GET_HEAT_DENSITY = new Command(0x1C, "GET_HEAT_DENSITY");

/**
 * 動作未確認
 */
Command.SENT_HEAT_DENSITY = new Command(0x1D, "SENT_HEAT_DENSITY");

/**
 * 動作未確認
 */
Command.SET_POWER_DOWN_TIME = new Command(0x1E, "SET_POWER_DOWN_TIME");

/**
 * 動作未確認
 */
Command.GET_POWER_DOWN_TIME = new Command(0x1F, "GET_POWER_DOWN_TIME");

/**
 * 動作未確認
 */
Command.SENT_POWER_DOWN_TIME = new Command(0x20, "SENT_POWER_DOWN_TIME");

/**
 * 動作未確認
 */
Command.FEED_TO_HEAD_LINE = new Command(0x21, "FEED_TO_HEAD_LINE");

/**
 * 動作未確認
 */
Command.PRINT_DEFAULT_PARA = new Command(0x22, "PRINT_DEFAULT_PARA");

/**
 * 動作未確認
 */
Command.GET_BOARD_VERSION = new Command(0x23, "GET_BOARD_VERSION");

/**
 * 動作未確認
 */
Command.SENT_BOARD_VERSION = new Command(0x24, "SENT_BOARD_VERSION");

/**
 * 動作未確認
 */
Command.GET_HW_INFO = new Command(0x25, "GET_HW_INFO");

/**
 * 動作未確認
 */
Command.SENT_HW_INFO = new Command(0x26, "SENT_HW_INFO");

/**
 * 動作未確認
 */
Command.SET_MAX_GAP_LENGTH = new Command(0x27, "SET_MAX_GAP_LENGTH");

/**
 * 動作未確認
 */

/**
 * 動作未確認
 */
Command.GET_MAX_GAP_LENGTH = new Command(0x28, "GET_MAX_GAP_LENGTH");

/**
 * 動作未確認
 */
Command.SENT_MAX_GAP_LENGTH = new Command(0x29, "SENT_MAX_GAP_LENGTH");

/**
 * 動作未確認
 */

/**
 * 動作未確認
 */
Command.GET_PAPER_TYPE = new Command(0x2A, "GET_PAPER_TYPE");

/**
 * 動作未確認
 */
Command.SENT_PAPER_TYPE = new Command(0x2B, "SENT_PAPER_TYPE");

/**
 * 動作未確認
 */
Command.SET_PAPER_TYPE = new Command(0x2C, "SET_PAPER_TYPE");

/**
 * 動作未確認
 */
Command.GET_COUNTRY_NAME = new Command(0x2D, "GET_COUNTRY_NAME");

/**
 * 動作未確認
 */
Command.SENT_COUNTRY_NAME = new Command(0x2E, "SENT_COUNTRY_NAME");

/**
 * 切断
 */
Command.DISCONNECT_BT_CMD = new Command(0x2F, "DISCONNECT_BT_CMD");

/**
 * コマンドの最大値
 */
Command.MAX_CMD = new Command(0x30, "MAX_CMD");
