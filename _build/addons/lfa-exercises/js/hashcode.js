define([], function() {
  String.prototype.hashCode = function () {
    var hash = 0, char;
    if (this.length === 0) {
      return hash;
    }
    for (var i = 0, len = this.length; i < len; i++) {
      char = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };
});