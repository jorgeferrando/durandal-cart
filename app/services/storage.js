define([],function() {
    var storage = localStorage;

    function unserialize(candidate) {
            try {
                var o = JSON.parse(candidate);
                if (o && typeof o === "object" && o !== null) {
                    return o;
                }
            }
            catch (e) {
                return candidate;
            }

            return candidate;
    }

    function setItem(key,value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        storage.setItem(key,value);
    }

    function getItem(key) {
        var str = storage.getItem(key);
        return unserialize(str);
    }

    function removeItem(key) {
        storage.removeItem(key);
    }
    return {
        setItem:setItem,
        getItem:getItem,
        removeItem: removeItem
    };
});
