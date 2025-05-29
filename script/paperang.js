class Paperang {
    static crc = [
        0x02, // 1.開始
        0x18, 0x00, // 2.制御コード
        0x04, 0x00, // 3.データ長さ
        0x78, 0x7A, 0xCE, 0x33, // 4.CRC_KEY
        0x2C, 0x89, 0x80, 0xF0, // 5.CRC（4から求める）
        0x03 // 6.終端
    ];
 
    // 初期設定などのメンバ変数相当
    /**
     * 初期設定などのメンバ変数相当
     *
     * @memberof Paperang
     */
    imageMode = ImageMode.MODE3x3;

    /**
     * 排他モード
     *
     * @memberof Paperang
     */
    isExecute = false;

    /**
     * 標準のキー
     *
     * CRCキーを送るときはこれを使ってCRCを求める
     * @static
     * @memberof Paperang
     */
    static standardKey = 0x35769521;

    /**
     * コマンド送信用のCRCキー（なぜ違うかはまだ不明）
     *
     * @static
     * @memberof Paperang
     */
    static crcKey = 0x06968634 ^ 0x2e696d;

    /**
     * コマンドの戻りデータを受け取る最大サイズ（バイト）
     *
     * @static
     * @memberof Paperang
     */
    static maxMsgLength = 1024;

    /**
     * BluetoothのSPP UUID（Web Bluetoothでは通常GATTを使うが、参考として保持）
     *
     * @memberof Paperang
     */
    static SPP_UUID = "00001101-0000-1000-8000-00805F9B34FB";

    /**
     * 空データ
     *
     * @static
     * @memberof Paperang
     */
    static EMPTYDATA = new Uint8Array(0);

    /**
     *選択中のデバイス
     *
     * @memberof Paperang
     */
    device = null;

    server = null;

    service = null;

    //service_uuid = '0000ffe0-0000-1000-8000-00805f9b34fb';
    //characteristic_uuid = '0000ffe1-0000-1000-8000-00805f9b34fb';

    //service_uuid = '0000180a-0000-1000-8000-00805f9b34fb';
    // write NG
    //characteristic_uuid = '00002a29-0000-1000-8000-00805f9b34fb';
    // write NG
    //characteristic_uuid = '00002a24-0000-1000-8000-00805f9b34fb';
    // write NG
    //characteristic_uuid = '00002a27-0000-1000-8000-00805f9b34fb';
    // write NG
    //characteristic_uuid = '00002a26-0000-1000-8000-00805f9b34fb';

    service_uuid = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
    characteristic_uuid = '49535343-8841-43f4-a8d4-ecbe34729bb3';
    //characteristic_uuid = '49535343-1e4d-4bd9-ba61-23c647249616';
    //characteristic_uuid = '00002902-0000-1000-8000-00805f9b34fb';
    //characteristic_uuid = '49535343-aca3-481c-91ec-d85e28a60318';
    //characteristic_uuid = '00002902-0000-1000-8000-00805f9b34fb';

    /**
     * デバイスを選択する
     */
    async selectDevice()  {
        this.device = await navigator.bluetooth.requestDevice({
          filters: [{ namePrefix: 'Paperang' }],
          optionalServices: [this.service_uuid]
        });
    }

    /**
     * 接続する
     */
    async connect(){
        try{
            console.log("connect...");
            this.server = await this.device.gatt.connect();
            
            console.log("service...");
            this.service = await this.server.getPrimaryService(this.service_uuid);
            
            console.log("characteristic...");
            this.characteristic  = await this.service.getCharacteristic(this.characteristic_uuid);
/*
            // 通知を開始
            console.log("start notifications...");
            await this.characteristic.startNotifications();

            this.characteristic.addEventListener('characteristicvaluechanged', event => {
                const value = event.target.value;
                // 通知のデータはUint8Arrayなどで受け取る
                const data = new Uint8Array(value.buffer);
                log('通知受信: ' + Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(' '));
            });
*/
            console.log("success");
            return true;

        }catch(e){
            console.log("faild");
            console.error(e);
            return false;

        }
    }

    /**
     * 切断する
     */
    async disconnect(){
        if (this.device.gatt.connected) {
            this.device.gatt.disconnect();
        }
    }

    /**
     * コマンドを実行
     * @param {Command} command 
     * @returns 
     */
    async execute(command, value){
        try{
            console.log("execute command " + command.name + " : " + command.val);
            let cmd = this.createCommand(command, value);
            await this.characteristic.writeValue(cmd);
            console.log("execute command success");
            return true;
        }catch(e){
            console.error(e);
            return false;
        }
    }

    createCommand(command, data, crckey = 0) {
        const bytes = [];

        // 開始バイト（0x02）
        bytes.push(0x02);

        // コマンド (2バイト Little Endian)
        const cmdVal = command.val; // 0〜65535の整数
        bytes.push(cmdVal & 0xff);
        bytes.push((cmdVal >> 8) & 0xff);
        //byteLog("COMMAND", [cmdVal & 0xff, (cmdVal >> 8) & 0xff]);

        // データ長 (2バイト Little Endian)
        const dataLen = data ? data.length : 0;
        bytes.push(dataLen & 0xff);
        bytes.push((dataLen >> 8) & 0xff);
        //byteLog("SIZE", [dataLen & 0xff, (dataLen >> 8) & 0xff]);

        // データ（そのまま書き込む）
        if (data && data.length > 0) {
            //byteLog("DATA", Array.from(data));
            bytes.push(...data);
        } else {
            //byteLog("DATA", []);
        }

        // CRC32（4バイト Little Endian）
        const crc = this.crc32(data || new Uint8Array(0), crckey);
        bytes.push(crc & 0xff);
        bytes.push((crc >> 8) & 0xff);
        bytes.push((crc >> 16) & 0xff);
        bytes.push((crc >> 24) & 0xff);
        //byteLog("CRC", [crc & 0xff, (crc >> 8) & 0xff, (crc >> 16) & 0xff, (crc >> 24) & 0xff]);

        // 終端バイト（0x03）
        bytes.push(0x03);

        const buffer = new Uint8Array(bytes);
        //byteLog("Command buffer", buffer);
        return buffer;
    }

    crc32(data, seed = 0) {
        const table = new Uint32Array(256).map((_, i) => {
            let c = i;
            for (let k = 0; k < 8; k++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            }
            return c >>> 0;
        });

        let crc = seed ^ 0xFFFFFFFF;
        for (let i = 0; i < data.length; i++) {
            crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }


}