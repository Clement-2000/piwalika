(function() {
// Save original method before overwriting it below.
const _setPosOriginal = L.Marker.prototype._setPos

L.Marker.addInitHook(function() {
    const anchor = this.options.icon.options.iconAnchor
    this.options.rotationOrigin = anchor ? `${anchor[0]}px ${anchor[1]}px` : 'center center'
    // Ensure marker remains rotated during dragging.
    this.on('drag', data => { this._rotate() })
})

L.Marker.include({
    // _setPos is alled when update() is called, e.g. on setLatLng()
    _setPos: function(pos) {
    _setPosOriginal.call(this, pos)
    if (this.options.rotation) this._rotate()
    },
    _rotate: function() {
    this._icon.style[`${L.DomUtil.TRANSFORM}Origin`] = this.options.rotationOrigin
    this._icon.style[L.DomUtil.TRANSFORM] += ` rotate(${this.options.rotation}deg)`
    }
})
})()