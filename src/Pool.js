(function() {

  var lib = {

    pools: new Map,

    getPool: function(constructor) {

      var pool = this.pools.get(constructor);

      if (!pool) {

        this.pools.set(constructor, []);

        return this.getPool(constructor);

      }

      return pool;

    },

    pull: function(constructor, args) {

      var pool = this.getPool(constructor);

      if (!pool.length) {

        for (var i = 0; i < 10; i++) {

          pool.push(new constructor);

        }

      }

      var result = pool.pop();

      result._reset(args);

      return result;

    },

    push: function(object) {

      var pool = this.getPool(object.constructor);

      pool.push(object);

    }

  };

  /* API */

  PLAYGROUND.Application.prototype.pool = function() {

    if (typeof arguments[0] === "function") {

      return lib.pull(arguments[0], arguments[1]);

    } else {

      return lib.push(arguments[0]);

    }

  };

})();