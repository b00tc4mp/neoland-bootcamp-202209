Burray.prototype.includes = function(searchElement) {
    for (let i = 0; i < this.length; i++)
        if (this[i] === searchElement)
            return true

    return false
}