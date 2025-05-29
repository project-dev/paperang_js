class ResultData {
  constructor(result) {
    this.isSuccess = false;

    if (result && result.length > 4) {
      this.start = result[0];
      this.cmdVal = (result[2] << 4) | result[1];
      this.cmd = Command.getCommand(this.cmdVal);
      this.length = (result[4] << 4) | result[3];

      const crcStart = 4 + this.length + 1;
      this.crc =
        (result[crcStart + 3] << 12) |
        (result[crcStart + 2] << 8) |
        (result[crcStart + 1] << 4) |
        result[crcStart];

      this.end = result[crcStart + 4];

      this.data = result.slice(5, 5 + this.length);

      this.isSuccess = true;
    }
  }

  getCommand() {
    return this.cmd;
  }

  getData() {
    return this.data;
  }

  getCrc() {
    return this.crc;
  }

  isSuccessResult() {
    return this.isSuccess;
  }

  toString() {
    if (!this.isSuccess) {
      return "faild execute";
    }

    let sb = "";
    sb += `START : ${this.start}\r\n`;
    sb += `COMMAND : ${this.cmd ? this.cmd.toString() : ""}\r\n`;
    sb += `LENGTH : ${this.length}\r\n`;

    sb += "DATA: ";
    let log = "";

    for (let i = 0; i < this.data.length; i++) {
      let hex = ("00" + (this.data[i] & 0xff).toString(16)).slice(-2);
      log += hex;

      if ((i + 1) % 48 === 0) {
        sb += log + "\r\n";
        log = "";
      } else {
        sb += " ";
      }
    }

    if (log.length > 0) {
      sb += log + "\r\n";
    }

    sb += `CRC: ${this.crc}\r\n`;
    sb += `END: ${this.end}\r\n`;

    return sb;
  }
}
