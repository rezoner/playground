var Utils = {

  extend: function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  },

  sign: function(i) {
    return i < 0 ? -1 : 1;
  },

  ucFirst: function(string) {
    return string[0].toUpperCase() + string.slice(1);
  },

  closest: function(o, a) {
    var min = -1;
    var result = null;

    for (var i = 0; i < a.length; i++) {

      if (o === a[i]) continue;

      var distance = Utils.distance(a[i].x, a[i].y, o.x, o.y);

      if (distance < min || min < 0) {
        min = distance;
        result = a[i];
      }
    }

    return result;
  },

  distance: function(x1, y1, x2, y2) {
    if (arguments.length > 2) {
      var dx = x1 - x2;
      var dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);
    } else {
      var dx = x1.x - y1.x;
      var dy = x1.y - y1.y;

      return Math.sqrt(dx * dx + dy * dy);
    }
  },

  distance3d: function(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var dz = a.z - b.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  fastDistance3d: function(a, b) {
    var dx = a.x - a.x;
    var dy = b.y - b.y;
    var dz = a.z - b.z;

    return dx * dx + dy * dy + dz * dz;
  },

  random: function(a, b) {

    if (a === undefined) {
      return Math.random();
    } else if (b !== undefined) {
      return Math.floor(a + Math.random() * Math.abs(b - a + 1));
    } else {
      if (a instanceof Array) return a[(a.length + 1) * Math.random() - 1 | 0];
      else {
        return a[this.randomElement(Object.keys(a))];
      }
    }

  },

  randomElement: function(a) {
    if (a instanceof Array) return a[(a.length + 1) * Math.random() - 1 | 0];
    else {
      return a[this.randomElement(Object.keys(a))];
    }
  },

  moveTo: function(value, target, step) {
    if (value < target) {
      value += step;
      if (value > target) value = target;
    }
    if (value > target) {
      value -= step;
      if (value < target) value = target;
    }

    return value;
  },

  atanxy: function(x, y) {
    var angle = Math.atan2(y, x);
    if (angle < 0) angle = Math.PI * 2 + angle;
    return angle;
  },

  lookAt: function(a, b, c, d) {
    if (c) {
      var angle = Math.atan2(d - b, c - a);
      if (angle < 0) angle = Math.PI * 2 + angle;
    } else {
      var angle = Math.atan2(b.y - a.y, b.x - a.x);
      if (angle < 0) angle = Math.PI * 2 + angle;
    }

    return angle;
  },

  lookAt3: function(a, b) {
    var angle = Math.atan2(b.y - (a.y - a.z), b.x - a.x);
    if (angle < 0) angle = Math.PI * 2 + angle;
    return angle;
  },

  circWrappedDistance: function(a, b) {
    return this.wrappedDistance(a, b, Math.PI * 2)
  },

  wrappedDistance: function(a, b, max) {
    if (a === b) return 0;
    else if (a < b) {
      var l = -a - max + b;
      var r = b - a;
    } else {
      var l = b - a;
      var r = max - a + b;
    }

    if (Math.abs(l) > Math.abs(r)) return r;
    else return l;
  },

  circWrap: function(val) {
    return this.wrap(val, 0, Math.PI * 2);
  },

  wrap: function(value, min, max) {
    if (value < min) return max + (value % max);
    if (value >= max) return value % max;
    return value;
  },

  wrapTo: function(value, target, max, step) {
    if (value === target) return target;

    var result = value;

    var d = this.wrappedDistance(value, target, max);

    if (Math.abs(d) < step) return target;

    result += (d < 0 ? -1 : 1) * step;

    if (result > max) {
      result = result - max;
    } else if (result < 0) {
      result = max + result;
    }

    return result;
  },

  circWrapTo: function(value, target, step) {
    return this.wrapTo(value, target, Math.PI * 2, step);
  },

  sincos: function(angle, radius) {

    if (arguments.length === 1) {
      radius = angle;
      angle = Math.random() * 6.28;
    }

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  },

  pointInRect: function(x, y, rx, ry, rw, rh) {
    return !(x < rx || y < ry || x > rx + rw || y > ry + rh);
  },

  rectInRect: function(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return !(r2x > r1x + r1w ||
      r2x + r2w < r1x ||
      r2y > r1y + r1h ||
      r2y + r2h < r1y);
  },

  lineCircleIntersection: function(ax, ay, bx, by, cx, cy, r) {

    var result = {
      inside: false,
      tangent: false,
      intersects: false,
      enter: null,
      exit: null
    };
    var a = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
    var b = 2 * ((bx - ax) * (ax - cx) + (by - ay) * (ay - cy));
    var cc = cx * cx + cy * cy + ax * ax + ay * ay - 2 * (cx * ax + cy * ay) - r * r;
    var deter = b * b - 4 * a * cc;

    result.distance = Math.sqrt(a);

    if (deter <= 0) {
      result.inside = false;
    } else {
      var e = Math.sqrt(deter);
      var u1 = (-b + e) / (2 * a);
      var u2 = (-b - e) / (2 * a);
      if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
        if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
          result.inside = false;
        } else {
          result.inside = true;
        }
      } else {

        if (0 <= u2 && u2 <= 1) {
          result.enter = this.interpolatePoints(ax, ay, bx, by, 1 - u2);
        }
        if (0 <= u1 && u1 <= 1) {
          result.exit = this.interpolatePoints(ax, ay, bx, by, 1 - u1);
        }
        result.intersects = true;
        if (result.exit != null && result.enter != null && result.exit[0] == result.enter[0] && result.exit[1] == result.enter[1]) {
          result.tangent = true;
        }
      }
    }
    return result.intersects ? result : false;
  },

  /* http://keith-hair.net/blog/2008/08/05/line-to-circle-intersection-data/ */

  interpolatePoints: function(ax, ay, bx, by, f) {

    return [f * ax + (1 - f) * bx, f * ay + (1 - f) * by];
  },

  array2d: function(width, height, value) {
    var result = [];

    if (value === undefined) value = 0;

    for (var x = 0; x < width; x++) {
      result[x] = [];
      for (var y = 0; y < height; y++) {
        result[x][y] = 0;
      }
    }
  },


  rotate: function(ax, ay, bx, by, a) {

    return [
      bx + (ax - bx) * Math.cos(a) - (ay - by) * Math.sin(a),
      by + (ax - bx) * Math.sin(a) + (ay - by) * Math.cos(a)
    ];

  },

  repulse: function(a, b) {
    var angle = this.lookAt(b, a);

    a.x = b.x + Math.cos(angle) * (a.radius + b.radius);
    a.y = b.y + Math.sin(angle) * (a.radius + b.radius);
  },

  clonePolygon: function(polygon) {
    var result = [];

    for (var i = 0; i < polygon.length; i++) {
      result.push([polygon[i][0], polygon[i][1]]);
    }

    return result;
  },

  scalePolygon: function(polygon, scale) {

    for (var i = 0; i < polygon.length; i++) {

      var vertex = polygon[i];

      vertex[0] *= scale;
      vertex[1] *= scale;
    }

    return polygon;
  },

  interval: function(object, key, interval) {

    if (!object.intervals) object.intervals = {};
    if (!object.intervals[key]) object.intervals[key] = object.delta - interval;

    if (object.delta - object.intervals[key] >= interval) {
      var rest = object.delta - object.intervals[key];
      object.intervals[key] = object.delta + rest;
      return true;
    } else return false;

  },


  saw: function(t) {
    if (t < 0.5) {
      return t / 0.5;
    } else {
      return 1 - (t - 0.5) / 0.5;
    }
  },


  matrixMultiply: function(a, b) {

    var result = [];

    for (var i = 0; i < a.length; i++) {
      result[i] = [];
      for (var j = 0; j < b[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }

    return result;
  },

  project3DTo2D: function(point, camera) {

    var a = this.matrixMultiply([
      [1, 0, 0],
      [0, 0, 1]
    ], [
      [point[0]],
      [point[1]],
      [point[2]]
    ]);

    return this.matrixMultiply(a, camera);
  },

  yawPitchRoll: function(z, y, x) {
    var temp = this.matrixMultiply(this.rotationMatrix(z, true, 0, 0), this.rotationMatrix(y, 0, 1, 0));
    return this.matrixMultiply(temp, this.rotationMatrix(x, 0, 0, 1));
  },

  rotationMatrix: function(angle, x, y, z) {

    if (x)
      return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
      ];

    if (y)
      return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
      ];

    if (z)
      return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
      ];

  },


  limit: function(value, min, max) {
    return value < min ? min : value > max ? max : value;
  },

  ground: function(num, threshold) {
    return (num / threshold | 0) * threshold;
  },

  align: function(boundX, boundY, boundW, boundH, objectW, objectH, boundAlignX, boundAlignY, objectAlignX, objectAlignY) {

    var result = [];

    if (typeof objectAlignX === "undefined") {
      if (boundAlignX === 'left') objectAlignX = 0;
      if (boundAlignX === 'right') objectAlignX = objectW;
      if (boundAlignX === 'center') objectAlignX = objectW / 2;
    }

    if (objectAlignX === 'left') objectAlignX = 0;
    else if (objectAlignX === 'right') objectAlignX = objectW;
    else if (objectAlignX === 'center') objectAlignX = objectW / 2;

    if (typeof objectAlignY === "undefined") {
      if (boundAlignY === 'top') objectAlignY = 0;
      if (boundAlignY === 'bottom') objectAlignY = objectH;
      if (boundAlignY === 'center') objectAlignY = objectH / 2;
    }

    if (objectAlignY === 'top') objectAlignY = 0;
    else if (objectAlignY === 'bottom') objectAlignY = objectH;
    else if (objectAlignY === 'center') objectAlignY = objectH / 2;

    if (boundAlignX === 'left') result[0] = boundX - objectAlignX;
    else if (boundAlignX === 'right') result[0] = boundX + boundW - objectAlignX;
    else if (boundAlignX === 'center') result[0] = boundX + boundW / 2 - objectAlignX;
    else result[0] = boundX + boundAlignX - objectAlignX;

    if (boundAlignY === 'top') result[1] = boundY - objectAlignY;
    else if (boundAlignY === 'bottom') result[1] = boundY + boundH - objectAlignY;
    else if (boundAlignY === 'center') result[1] = boundY + boundH / 2 - objectAlignY;
    else result[1] = boundY + boundAlignY - objectAlignY;

    return {
      x: result[0],
      y: result[1]
    };
  }



};
