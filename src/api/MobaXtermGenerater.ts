const VariantBase64Table =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('')
let VariantBase64Dict: { [key: number]: string } = {}
VariantBase64Table.forEach((val, i) => (VariantBase64Dict[i] = val))
let VariantBase64ReverseDict: { [key: string]: number } = {}
VariantBase64Table.forEach((val, i) => (VariantBase64ReverseDict[val] = i))

/* License 类型 */
const LicenseType = {
  Professional: 1,
  Educational: 3,
  Persional: 4,
}

// 添加字符串转字节数组的辅助函数
const stringToBytes = (str: string): Uint8Array => {
  return new TextEncoder().encode(str)
}

// 添加字节数组转字符串的辅助函数
const bytesToString = (bytes: Uint8Array): string => {
  return new TextDecoder().decode(bytes)
}

/**
 * 使用 DataView 实现字节数组转换为数字
 *
 * @param bytes
 * @param offset
 * @param littleEndian
 * @returns
 */
const bytesToInt = (bytes: Uint8Array, offset: number, littleEndian: boolean = true): number => {
  // 确保不会越界访问
  if (offset + 4 > bytes.length) {
    // 如果不足4个字节，我们创建一个新的缓冲区并填充数据
    const tempBuffer = new ArrayBuffer(4)
    const tempView = new DataView(tempBuffer)
    const bytesView = new Uint8Array(tempBuffer)

    // 复制现有字节
    for (let i = 0; i < Math.min(4, bytes.length - offset); i++) {
      bytesView[i] = bytes[offset + i]
    }

    return tempView.getUint32(0, littleEndian)
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset + offset, 4)
  return view.getUint32(0, littleEndian)
}

/**
 * 进行 base64 编码
 *
 * @param bs
 * @returns
 */
const VariantBase64Encode = (bs: Uint8Array) => {
  let result: number[] = []
  let blocks_count = Math.floor(bs.length / 3)
  let left_bytes = bs.length % 3
  let coding_int: number, block: string
  for (let i = 0; i < blocks_count; i++) {
    coding_int = bytesToInt(bs, 3 * i, true)
    block = VariantBase64Dict[coding_int & 0x3f]
    block += VariantBase64Dict[(coding_int >> 6) & 0x3f]
    block += VariantBase64Dict[(coding_int >> 12) & 0x3f]
    block += VariantBase64Dict[(coding_int >> 18) & 0x3f]

    // 将字符串转换为字节数组
    for (let j = 0; j < block.length; j++) {
      result.push(block.charCodeAt(j))
    }
  }

  switch (left_bytes) {
    case 0:
      return new Uint8Array(result)
    case 1:
      coding_int = bytesToInt(bs, 3 * blocks_count, true)
      block = VariantBase64Dict[coding_int & 0x3f]
      block += VariantBase64Dict[(coding_int >> 6) & 0x3f]

      // 将字符串转换为字节数组
      for (let j = 0; j < block.length; j++) {
        result.push(block.charCodeAt(j))
      }
      return new Uint8Array(result)
    default:
      coding_int = bytesToInt(bs, 3 * blocks_count, true)
      block = VariantBase64Dict[coding_int & 0x3f]
      block += VariantBase64Dict[(coding_int >> 6) & 0x3f]
      block += VariantBase64Dict[(coding_int >> 12) & 0x3f]

      // 将字符串转换为字节数组
      for (let j = 0; j < block.length; j++) {
        result.push(block.charCodeAt(j))
      }
      return new Uint8Array(result)
  }
}

/**
 * 加密字节数组
 *
 * @param key
 * @param bs
 * @returns
 */
const EncryptBytes = (key: number, bs: Uint8Array) => {
  let result: number[] = []
  bs.forEach((val) => {
    const xorVal = val ^ ((key >> 8) & 0xff)
    result.push(xorVal)

    key = (xorVal & key) | 0x482d
  })
  return new Uint8Array(result)
}

/**
 * 解密字节数组
 *
 * @param key
 * @param bs
 * @returns
 */
const DecryptBytes = (key: number, bs: Uint8Array) => {
  let result: number[] = []
  bs.forEach((val) => {
    const xorVal = val ^ ((key >> 8) & 0xff)
    result.push(xorVal)
    key = (val & key) | 0x482d
  })
  return new Uint8Array(result)
}

/**
 * 生成许可证
 *
 */
const generateLicense = (
  type: number,
  count: number,
  userName: string,
  majorVersion: number,
  minorVersion: number,
) => {
  let licenseSourceStr = `${type}#${userName}|${majorVersion}${minorVersion}#${count}#${majorVersion}3${minorVersion}6${minorVersion}#0#0#0#`
  const encryptedBytes = EncryptBytes(0x787, stringToBytes(licenseSourceStr))
  const encodedBytes = VariantBase64Encode(encryptedBytes)
  return bytesToString(encodedBytes)
}

export { LicenseType, generateLicense }
