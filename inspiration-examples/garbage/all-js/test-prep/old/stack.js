/*
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * eq(object, object)
 * // => true
 *
 * eq(object, other)
 * // => false
 *
 * eq('a', 'a')
 * // => true
 *
 * eq('a', Object('a'))
 * // => false
 *
 * eq(NaN, NaN)
 * // => true
 */
function eq(value, other) {
    return value === other || (value !== value && other !== other);
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
    let { length } = array;
    while (length--) {
        if (eq(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}
class ListCache {
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    constructor(entries) {
        let index = -1;
        const length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
            const entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @memberOf ListCache
     */
    clear() {
        this.__data__ = [];
        this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key) {
        const data = this.__data__;
        const index = assocIndexOf(data, key);

        if (index < 0) {
            return false;
        }
        const lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop();
        } else {
            data.splice(index, 1);
        }
        --this.size;
        return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    get(key) {
        const data = this.__data__;
        const index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    has(key) {
        return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    set(key, value) {
        const data = this.__data__;
        const index = assocIndexOf(data, key);

        if (index < 0) {
            ++this.size;
            data.push([key, value]);
        } else {
            data[index][1] = value;
        }
        return this;
    }
}

/** Used to stand-in for `undefined` hash values. */
const HASH_UNDEFINED = "__lodash_hash_undefined__";

class Hash {
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    constructor(entries) {
        let index = -1;
        const length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
            const entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @memberOf Hash
     */
    clear() {
        this.__data__ = Object.create(null);
        this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @memberOf Hash
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key) {
        const result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    get(key) {
        const data = this.__data__;
        const result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    has(key) {
        const data = this.__data__;
        return data[key] !== undefined;
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    set(key, value) {
        const data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = value === undefined ? HASH_UNDEFINED : value;
        return this;
    }
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData({ __data__ }, key) {
    const data = __data__;
    return isKeyable(key)
        ? data[typeof key === "string" ? "string" : "hash"]
        : data.map;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
    const type = typeof value;
    return type === "string" ||
        type === "number" ||
        type === "symbol" ||
        type === "boolean"
        ? value !== "__proto__"
        : value === null;
}

class MapCache {
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    constructor(entries) {
        let index = -1;
        const length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
            const entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @memberOf MapCache
     */
    clear() {
        this.size = 0;
        this.__data__ = {
            hash: new Hash(),
            map: new Map(),
            string: new Hash(),
        };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key) {
        const result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    get(key) {
        return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    has(key) {
        return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    set(key, value) {
        const data = getMapData(this, key);
        const size = data.size;

        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
    }
}

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200;

class Stack {
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    constructor(entries) {
        const data = (this.__data__ = new ListCache(entries));
        this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @memberOf Stack
     */
    clear() {
        this.__data__ = new ListCache();
        this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    delete(key) {
        const data = this.__data__;
        const result = data["delete"](key);

        this.size = data.size;
        return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    get(key) {
        return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    has(key) {
        return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    set(key, value) {
        let data = this.__data__;
        if (data instanceof ListCache) {
            const pairs = data.__data__;
            if (pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
            }
            data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
    }
}

export default Stack;
