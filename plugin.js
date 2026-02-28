// 喜马拉雅刮削插件 (JavaScript 版本)
// 使用 fetch 发送 HTTP 请求

// -----------------------------------------------------------------------------
// MD5 Implementation (Pure JS)
// -----------------------------------------------------------------------------
function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    var x = ConvertToWordArray(string);
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}

// -----------------------------------------------------------------------------
// Plugin Logic
// -----------------------------------------------------------------------------

// 错误类型定义
const ErrorType = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    API_ERROR: 'API_ERROR',
    PARSE_ERROR: 'PARSE_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    RATE_LIMIT: 'RATE_LIMIT',
    INVALID_RESPONSE: 'INVALID_RESPONSE'
};

// 重试配置
const RETRY_CONFIG = {
    MAX_RETRIES: 3,
    INITIAL_DELAY: 1000,
    MAX_DELAY: 10000,
    BACKOFF_MULTIPLIER: 2
};

// Headers from Abs-Ximalaya (Mobile)
const MOBILE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-S9110 Build/PQ3A.190605.09291615; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36 iting(main)/9.3.96/android_1 xmly(main)/9.3.96/android_1 kdtUnion_iting/9.3.96',
    'Accept': 'application/json, text/plain, */*',
    'x-requested-with': 'XMLHttpRequest',
    'referer': 'https://mobile.ximalaya.com/',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie': '1&_device=android&28b5647f-40d9-3cb6-802a-54905eccc23d&9.3.96; 1&_token=575426552&C29CC6B0140C8E529835C3060AD1FE97FBF87FFBF4DB5BFB15C60DECE3899A36EDA3462173EE229Mbf90403ACAFF0C4_; channel=and-f5; impl=com.ximalaya.ting.android; osversion=28; fp=009517657x2222322v64v050210000k120211200200000001103611000040; device_model=SM-S9110; XUM=CAAn8P8v; c-oper=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8; net-mode=WIFI; res=1600%2C900; AID=Yjg2YWIyZTRmNzYyN2FjNA==; manufacturer=samsung; umid=ai0fc70f150ccc444005b5c665d7ee7861; xm_grade=0; specialModeStatus=0; yzChannel=and-f5; _xmLog=h5&9550461b-17b4-4dcc-ab09-8609fcda6c02&2.4.24; xm-page-viewid=album-detail-intro'
};

// Web Headers
const WEB_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.ximalaya.com/',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
};

/**
 * Generate xm-sign
 */
async function getXmSign() {
    try {
        const response = await fetchJson('https://www.ximalaya.com/revision/time', {
            headers: WEB_HEADERS,
            method: 'GET'
        });
        const serverTime = response.data;
        const now = Date.now();
        const randomNum = Math.floor(Math.random() * 100);
        const hash = md5(`himalaya-${serverTime}`);
        return `${hash}(${randomNum})${serverTime}(${randomNum})${now}`;
    } catch (e) {
        Ting.log.warn('Failed to generate xm-sign: ' + e.message);
        return null;
    }
}

class XimalayaError extends Error {
    constructor(message, type, details = {}) {
        super(message);
        this.name = 'XimalayaError';
        this.type = type;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            type: this.type,
            details: this.details,
            timestamp: this.timestamp
        };
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buildQueryString(params) {
    if (!params) return '';
    const parts = [];
    for (const key of Object.keys(params)) {
        const value = params[key];
        if (value !== undefined && value !== null) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    }
    return parts.join('&');
}

async function fetchJson(url, options = {}) {
    const headers = options.headers || {};
    const method = options.method || 'GET';
    
    let finalUrl = url;
    if (options.params) {
        const queryString = buildQueryString(options.params);
        if (queryString) {
            const separator = finalUrl.includes('?') ? '&' : '?';
            finalUrl = `${finalUrl}${separator}${queryString}`;
        }
    }

    try {
        const response = await fetch(finalUrl, {
            method,
            headers,
            body: options.data ? JSON.stringify(options.data) : undefined
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data, status: response.status, headers: response.headers };
    } catch (error) {
        error.isAxiosError = true;
        error.response = error.response || {};
        throw error;
    }
}

async function fetchBuffer(url, options = {}) {
    const headers = options.headers || {};
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        return { 
            data: new Uint8Array(arrayBuffer), 
            status: response.status, 
            headers: response.headers 
        };
    } catch (error) {
        error.isAxiosError = true;
        throw error;
    }
}

function calculateRetryDelay(attempt) {
    const delay = RETRY_CONFIG.INITIAL_DELAY * Math.pow(RETRY_CONFIG.BACKOFF_MULTIPLIER, attempt - 1);
    return Math.min(delay, RETRY_CONFIG.MAX_DELAY);
}

async function executeWithRetry(requestFn, operation) {
    let lastError;
    
    for (let attempt = 1; attempt <= RETRY_CONFIG.MAX_RETRIES; attempt++) {
        try {
            Ting.log.info(`[${operation}] 尝试 ${attempt}/${RETRY_CONFIG.MAX_RETRIES}`);
            const result = await requestFn();
            return result;
        } catch (error) {
            lastError = error;
            Ting.log.error(`[${operation}] 尝试 ${attempt} 失败: ${error.message}`);
            
            if (attempt < RETRY_CONFIG.MAX_RETRIES) {
                const delay = calculateRetryDelay(attempt);
                await sleep(delay);
            }
        }
    }
    
    throw lastError;
}

function parseApiError(error, operation) {
    return new XimalayaError(
        `API 请求失败: ${error.message}`,
        ErrorType.NETWORK_ERROR,
        { operation, message: error.message }
    );
}

function initialize(context) {
    Ting.log.info('喜马拉雅刮削插件 (JavaScript) 已初始化');
}

function shutdown() {
    Ting.log.info('喜马拉雅刮削插件 (JavaScript) 正在关闭');
}

const TextCleaner = {
    cleanBookTitle(title) {
        if (!title) return '';
        // Check for separators: |, 丨, ｜
        const separators = ['|', '丨', '｜'];
        let cutoff = -1;
        
        for (const sep of separators) {
            const idx = title.indexOf(sep);
            if (idx !== -1) {
                if (cutoff === -1 || idx < cutoff) {
                    cutoff = idx;
                }
            }
        }

        if (cutoff !== -1) {
            return title.substring(0, cutoff).trim();
        }
        return title.trim();
    },

    cleanAuthor(name) {
        if (!name) return '';
        // Remove leading colons, spaces, etc.
        return name.replace(/^[：:\s]+/, '').trim();
    },

    cleanChapterTitle(title, bookTitle) {
        if (!title) return '';
        
        // 0. Remove extension if present (though unlikely for API titles)
        let cleaned = title.replace(/\.[^/.]+$/, "");
        
        // 1. Handle " - " separated parts
        if (cleaned.includes(' - ')) {
            const parts = cleaned.split(' - ');
            let chapterPartIndex = -1;
            
            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                if (
                    /第\s*\d+\s*[集回章话]/.test(part) ||
                    /[集回章话]\s*\d+/.test(part) ||
                    /^\d+[\s.\-_]+/.test(part) ||
                    /[\s.\-_]+\d+$/.test(part) ||
                    /^\d+$/.test(part)
                ) {
                    chapterPartIndex = i;
                    if (/第\s*\d+\s*[集回章话]/.test(part)) break;
                }
            }
            
            if (chapterPartIndex !== -1) {
                cleaned = parts.slice(chapterPartIndex).join(' - ');
            } else {
                cleaned = parts[parts.length - 1];
            }
        }

        // 2. Detect and remove "Extra" markers
        const extraPatterns = [/番外[：:\-\s]*/i, /花絮[：:\-\s]*/i, /特典[：:\-\s]*/i, /SP[：:\-\s]*/i, /Extra[：:\-\s]*/i];
        let isExtra = false;
        for (const pattern of extraPatterns) {
            if (pattern.test(cleaned)) {
                isExtra = true;
                cleaned = cleaned.replace(pattern, '');
            }
        }
        if (!isExtra && /番外|花絮|特典|SP|Extra/i.test(cleaned)) {
            isExtra = true;
        }

        // 3. Remove common promotional suffixes
        const promoKeywords = [
            '请?订阅', '转发', '五星', '好评', '关注', '微信', '群', '更多', 
            '加我', '联系', '点击', '搜新书', '新书', '推荐', '上架', '完本'
        ];
        const promoRegex = new RegExp(`[（\\(\\[\\{【](?:${promoKeywords.join('|')}).*?[）\\)\\]\\}】]`, 'g');
        cleaned = cleaned.replace(promoRegex, '');

        // 4. Remove book title if present
        if (bookTitle) {
            const cleanBookTitle = bookTitle.split(/[丨|｜\-]/)[0].trim();
            if (cleanBookTitle.length > 1) {
                const escapedTitle = cleanBookTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const startRegex = new RegExp(`^${escapedTitle}`, 'i');
                cleaned = cleaned.replace(startRegex, '');
                
                const endRegex = new RegExp(`${escapedTitle}$`, 'i');
                if (endRegex.test(cleaned)) {
                    const potentialTitle = cleaned.replace(endRegex, '');
                    const isJustNumber = /^[\s.\-_]*((第\s*\d+\s*[集回章话])|(\d+))[\s.\-_]*$/.test(potentialTitle);
                    if (!isJustNumber) {
                        cleaned = potentialTitle;
                    }
                }
            }
        }

        // 5. Handle Chapter Numbers (Remove "第xxx集" if other content exists)
        const chapterPattern = /(第\s*\d+\s*[集回章话])/;
        const match = cleaned.match(chapterPattern);
        const chapterStr = match ? match[1] : '';
        
        let tempTitle = cleaned.replace(/第\s*\d+\s*[集回章话]\s*/g, '');
        
        // 6. Remove leading/trailing numbers and separators
        tempTitle = tempTitle.replace(/^\d+[\s.\-_]+/, '').replace(/[\s.\-_]+\d+$/, '');
        
        // 7. Remove common suffixes
        tempTitle = tempTitle.replace(/[-_]ZmAudio$/i, '');
        
        // 8. Final cleanup
        tempTitle = tempTitle.replace(/^[：:\s\-_.]+/, '').replace(/[：:\s\-_.]+$/, '').trim();
        
        if (tempTitle.length === 0) {
            if (chapterStr) return chapterStr;
            const numMatch = cleaned.match(/(\d+)/);
            if (numMatch) return numMatch[1];
            return cleaned; // Fallback
        }
        
        return tempTitle;
    },

    fixUrl(url) {
        if (!url) return null;
        // Remove backticks and whitespace
        let cleanUrl = url.replace(/[`\s]/g, '');
        // Remove query parameters starting with ! or ?
        const queryIndex = cleanUrl.indexOf('!');
        if (queryIndex !== -1) {
            cleanUrl = cleanUrl.substring(0, queryIndex);
        }
        const qIndex = cleanUrl.indexOf('?');
        if (qIndex !== -1) {
            cleanUrl = cleanUrl.substring(0, qIndex);
        }

        if (cleanUrl.startsWith('//')) {
            return 'https:' + cleanUrl;
        }
        // Force HTTPS
        if (cleanUrl.startsWith('http:')) {
            return cleanUrl.replace('http:', 'https:');
        }
        return cleanUrl;
    },
    
    cleanDescription(text) {
        if (!text) return '';
        let desc = text;
        
        // 1. Remove HTML tags but keep newlines
        desc = desc.replace(/<br\s*\/?>/gi, '\n')
                   .replace(/<p[^>]*>/gi, '\n')
                   .replace(/<[^>]+>/g, '');

        // 2. Remove "内容简介" at the beginning
        desc = desc.replace(/^\s*内容简介\s*[:：]?\s*/i, '');

        // 3. Split into lines
        let lines = desc.split('\n').map(l => l.trim()).filter(l => l);
        
        // 3. Filter out lines that look like purchase notes or ads
        // We do NOT use [\s\S]* to avoid truncating the whole text if a keyword appears early.
        // Instead, we filter out specific lines or stop if we hit a clear "End of content" marker.
        const stopKeywords = ['购买须知', '温馨提示', '版权声明', '加听友群', '联系方式', '主播联系'];
        const filteredLines = [];
        
        for (const line of lines) {
            // If the line is exactly one of the stop keywords (or starts with it heavily), we might stop or skip.
            // But checking if the line *contains* it is safer for skipping just that line.
            // However, "Purchase Notes" usually marks the end of useful content.
            let isStop = false;
            for (const kw of stopKeywords) {
                if (line.includes(kw)) {
                    isStop = true;
                    break;
                }
            }
            
            if (isStop) {
                // If we hit a stop keyword, we assume the rest is junk (common in Ximalaya)
                break; 
            }
            
            // Skip lines that look like ads but aren't stop markers
            if (/^vx[:：]/i.test(line) || /^\d{5,}$/.test(line)) {
                continue;
            }
            
            filteredLines.push(line);
        }

        return filteredLines.join('\n').trim();
    }
};

/**
 * 搜索有声书
 */
async function search(args) {
    const query = args.query || '';
    const page = args.page || 1;
    
    Ting.log.info(`搜索喜马拉雅: ${query}, 页码: ${page}`);
    
    return executeWithRetry(async () => {
        try {
            const xmSign = await getXmSign();
            const headers = { ...WEB_HEADERS, 'xm-sign': xmSign };
            
            // Try Primary Search
            const url = 'https://www.ximalaya.com/revision/search?core=album&spellchecker=true&rows=20&condition=relation&device=web';
            
            const response = await fetchJson(url, {
                params: { kw: query, page: page },
                headers: { ...headers, 'Referer': `https://www.ximalaya.com/so/${encodeURIComponent(query)}/` }
            });
            
            const data = response.data;
            const items = [];
            let total = 0;

            if (data?.data?.result?.response?.docs) {
                const docs = data.data.result.response.docs;
                total = data.data.result.response.total;
                
                for (const doc of docs) {
                    items.push({
                        id: String(doc.id),
                        title: TextCleaner.cleanBookTitle(doc.title),
                        author: '', // Search results only provide anchor, which is not the author
                        cover_url: TextCleaner.fixUrl(doc.cover_path),
                        intro: doc.intro
                    });
                }
            } else {
                // Fallback to Main Search
                Ting.log.info('Primary search failed, trying fallback...');
                const mainUrl = 'https://www.ximalaya.com/revision/search/main';
                const mainRes = await fetchJson(mainUrl, {
                    params: { kw: query, page: page, core: 'all', rows: 20 },
                    headers
                });
                
                if (mainRes?.data?.data?.album?.docs) {
                    const docs = mainRes.data.data.album.docs;
                    total = mainRes.data.data.album.total;
                    for (const doc of docs) {
                        items.push({
                            id: String(doc.albumId),
                            title: TextCleaner.cleanBookTitle(doc.albumTitle),
                            author: '', // Search results only provide anchor, which is not the author
                            cover_url: TextCleaner.fixUrl(doc.coverPath),
                            intro: doc.intro
                        });
                    }
                }
            }
            
            Ting.log.info(`搜索成功: 找到 ${items.length} 个结果`);
            
            // Enhance the first item with details (since scraping usually picks the first one)
            // System scraper relies on search result containing full metadata.
            if (items.length > 0) {
                try {
                    Ting.log.info(`正在获取第一条结果的详细信息: ${items[0].title}`);
                    // Reuse getDetail logic but we need to be careful about recursion or shared logic
                    // We can call getDetail directly as it's defined in the scope
                    const detail = await getDetail({ book_id: items[0].id });
                    
                    // Merge detail into items[0]
                    items[0] = {
                        ...items[0],
                        author: detail.author || items[0].author,
                        intro: detail.intro || items[0].intro,
                        cover_url: detail.cover_url || items[0].cover_url,
                        // Add extra fields required by system
                        narrator: detail.narrator,
                        tags: detail.tags,
                        chapter_count: detail.chapter_count
                    };
                    Ting.log.info(`第一条结果详情获取成功`);
                } catch (e) {
                    Ting.log.warn(`获取第一条结果详情失败: ${e.message}`);
                }
            }
            
            return {
                items: items,
                total: total || items.length,
                page: page,
                page_size: items.length
            };
        } catch (error) {
            throw parseApiError(error, 'search');
        }
    }, 'search');
}

/**
 * 获取有声书详情
 */
async function getDetail(args) {
    const bookId = args.book_id;
    
    Ting.log.info(`获取喜马拉雅书籍详情: ${bookId}`);
    
    return executeWithRetry(async () => {
        try {
            // 1. Try Mobile API first (Better description)
            const mobileUrl = 'https://mobile.ximalaya.com/mobile-album/album/plant/detail';
            try {
                const mobileRes = await fetchJson(mobileUrl, {
                    params: { albumId: bookId, identity: 'podcast' },
                    headers: MOBILE_HEADERS
                });
                
                if (mobileRes?.data?.data) {
                    const d = mobileRes.data.data;
                    
                    // Handle new Mobile API structure (baseAlbum, anchor, intro, resourceBit)
                    const base = d.baseAlbum || d.albumInfo || d.mainInfo || d.album || {};
                    const anchor = d.anchor || {};
                    const introData = d.intro || {};
                    
                    const richIntro = introData.richIntro || introData.intro || base.intro || '';
                    
                    let intro = TextCleaner.cleanDescription(richIntro);
                    let title = TextCleaner.cleanBookTitle(base.title || base.albumTitle || '');
                    
                    let narrator = anchor.nickname || base.nickname || base.anchorName || '';
                    let author = '';

                    // Try to find "author" or "original author" in creativeTeam
                    if (d.resourceBit?.creativeTeam?.extraInfo?.creativeTeam) {
                        try {
                            const teamData = JSON.parse(d.resourceBit.creativeTeam.extraInfo.creativeTeam);
                            if (teamData && teamData.creativeTeams) {
                                const authorTeam = teamData.creativeTeams.find(m => 
                                    m.role === '作者' || m.role === '原著' || m.role === '编剧'
                                );
                                if (authorTeam) {
                                    author = authorTeam.nickName;
                                }
                                
                                // If narrator is empty, try to find it here too
                                if (!narrator) {
                                    const anchorTeam = teamData.creativeTeams.find(m => m.role === '主播');
                                    if (anchorTeam) {
                                        narrator = anchorTeam.nickName;
                                    }
                                }
                            }
                        } catch (e) {
                            Ting.log.warn('Failed to parse creativeTeam JSON: ' + e.message);
                        }
                    }

                    // If author is still missing, try to extract from description
                    if (!author || author === '未知作者') {
                        const authorMatch = intro.match(/(?:作者|原著|编剧|作者\s*[:：\s]*|原著\s*[:：\s]*)\s*([^\n\s|【〔(（]+)/) ||
                                            intro.match(/([^\n\s|【〔(（]+)\s*(?:著|编著)/);
                        if (authorMatch) {
                            author = authorMatch[1].trim();
                        }
                    }
                    
                    // Fallback: if we still don't have an author, use the narrator? 
                    // No, user explicitly said author is NOT narrator. 
                    // So we keep author empty if not found, or maybe '未知'.
                    // But for compatibility with UI that might expect something, we'll leave it empty string if not found.

                    // Parse tags properly
                    let tags = [];
                    if (base.tags) {
                        if (typeof base.tags === 'string') {
                            tags = base.tags.split(',').filter(t => t);
                        } else if (Array.isArray(base.tags)) {
                            tags = base.tags;
                        }
                    } else if (d.albumTags && Array.isArray(d.albumTags)) {
                        // Sometimes tags are in albumTags array of objects
                        tags = d.albumTags.map(t => t.tagName || t.name).filter(t => t);
                    } else if (d.resourceBit?.albumIntro?.body && Array.isArray(d.resourceBit.albumIntro.body)) {
                        // Sometimes tags are in resourceBit.albumIntro.body as text items
                        tags = d.resourceBit.albumIntro.body
                            .filter(item => item.bizType === 'text' && item.title)
                            .map(item => item.title);
                    }

                    return {
                        id: String(bookId),
                        title: title,
                        author: TextCleaner.cleanAuthor(author),
                        narrator: narrator, 
                        cover_url: TextCleaner.fixUrl(base.coverLarge || base.coverMiddle || base.coverSmall || base.coverPath || base.cover || base.albumCoverPath),
                        intro: intro,
                        tags: tags,
                        chapter_count: base.trackCount || base.tracksInfo?.trackTotalCount || 0,
                        duration: null
                    };
                }
            } catch (e) {
                Ting.log.warn(`Mobile API failed: ${e.message}, trying Web API...`);
            }

            // 2. Fallback to Web API
            const url = `https://www.ximalaya.com/revision/album/v1/getAlbumDetail`;
            const xmSign = await getXmSign();
            const response = await fetchJson(url, {
                params: { albumId: bookId, device: 'web' },
                headers: { ...WEB_HEADERS, 'xm-sign': xmSign }
            });
            
            const data = response.data;
            
            if (!data.data || !data.data.mainInfo) {
                throw new Error('专辑不存在或无法访问');
            }
            
            const mainInfo = data.data.mainInfo;
            const rawTitle = mainInfo.albumTitle || '';
            const desc = mainInfo.detailRichIntro || mainInfo.richIntro || mainInfo.intro || '';
            
            // Web API tags handling
            let webTags = [];
            if (mainInfo.tags) {
                if (typeof mainInfo.tags === 'string') {
                    webTags = mainInfo.tags.split(',').filter(t => t.trim());
                } else if (Array.isArray(mainInfo.tags)) {
                    // Check if it's array of strings or objects
                    webTags = mainInfo.tags.map(t => typeof t === 'string' ? t : (t.tagName || t.name)).filter(t => t);
                }
            } else if (mainInfo.categorys && Array.isArray(mainInfo.categorys)) {
                 webTags = mainInfo.categorys.map(c => c.categoryName || c.name).filter(c => c);
            }
            
            return {
                id: String(bookId),
                title: TextCleaner.cleanBookTitle(rawTitle),
                author: TextCleaner.cleanAuthor(mainInfo.creatName || ''),
                narrator: mainInfo.anchorName || null,
                cover_url: TextCleaner.fixUrl(mainInfo.cover || mainInfo.coverMiddle || mainInfo.coverSmall),
                intro: TextCleaner.cleanDescription(desc),
                tags: webTags,
                chapter_count: mainInfo.tracksInfo ? mainInfo.tracksInfo.trackTotalCount : 0,
                duration: null
            };
        } catch (error) {
            throw parseApiError(error, 'getDetail');
        }
    }, 'getDetail');
}

/**
 * 获取章节列表
 */
/*
async function getChapters(args) {
    // ...
}

async function downloadCover(args) {
    // ...
}
*/

// 确保函数是全局的
globalThis.initialize = initialize;
globalThis.shutdown = shutdown;
globalThis.search = search;
// globalThis.getDetail = getDetail; // No longer used by system, but used internally
// globalThis.getChapters = getChapters; // Not used by scraper system
// globalThis.downloadCover = downloadCover; // Not used by scraper system
