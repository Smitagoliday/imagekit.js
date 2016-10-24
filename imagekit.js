(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(["jQuery"], function(jQuery){
      return (root.imagekit = factory(jQuery));
    });
  } else if(typeof module === "object" && module.exports) {
    module.exports = (root.imagekit = factory(require("jQuery")));
  } else {
    root.imagekit = factory(root.jQuery);
  }
}(this, function($) {
  // accepts a list of elements on which src has to be set
  $.fn.imagekit = function(options) {
    return this.each(function() {
      var elm = $(this);
      var elementOptions = getAttributes(elm);
      var finalOptions = $.extend({},getDefaults(), options, elementOptions);
      if(validateOptions(finalOptions)) {
        var src = getImageUrl(finalOptions);
        elm.attr(finalOptions["data-srcattribute"], src);
      }
    });
  };

  function validateOptions(options) {
    var error = "";
    if(!options["data-path"]) {
      error = "You must specify the path for image";
      throw(new Error(error));
      return false;
    }

    if(!options["data-imagekitid"] && !options["data-host"]) {
      error = "You must specify either imagekit Id or host";
      throw(new Error(error));
      return false;
    }

    return true;
  }

  var imagekit = {
    url : function(options) {
      var newOptions = {};
      $.each(options, function(key, value) {
        newOptions["data-" + key] = value;
      });
      var finalOptions = $.extend({},getDefaults(), newOptions);
      if(validateOptions(finalOptions)) {
        return getImageUrl(finalOptions);
      }
    },
    image : function(options) {},
    // all lowercase because we read from attributes and it converts the key in lowercase
    config : {
      "url-pattern" : "img",
      "imagekitid" : "",
      "usesubdomain" : "false", // as string because from DOM we get in string anyway
      "usesecure" : "true",
      "host" : "",
      "srcattribute" : "src",
      "srcsetattribute" : "srcset"
    }
  };

  function getImageUrl(options) {
    var url = "";
    var baseUrl = removeLeadingAndTrailingSlash(getBaseUrl(options));
    var transformationString = removeLeadingAndTrailingSlash(getTransformationString(options));
    var path = removeLeadingAndTrailingSlash(options["data-path"]);
    return [baseUrl, transformationString, path].join("/");
  }

  function getTransformationString(options) {
    if(options["data-transformation"] && typeof options["data-transformation"] != "string") {
      var transformationString = "tr";
      $.each(options["data-transformation"], function(key, singleTransformation) {
        var transformation = [];
        $.each(singleTransformation, function (k, v) {
          if (VALID_TRANSFORMS["data-" + k]) {
            transformation.push([VALID_TRANSFORMS["data-" + k](v)]);
          }
        });
        transformationString += ":" + transformation.join(",");
      });
      return transformationString;
    } else {
      var transformation = [];
      $.each(options, function (key, value) {
        if (VALID_TRANSFORMS[key]) {
          transformation.push([VALID_TRANSFORMS[key](value)]);
        }
      });
      if(transformation.length) {
        return "tr:" + transformation.join(",");
      } else {
        return "";
      }
    }
  }

  var VALID_TRANSFORMS = {
    "data-height" : function(value) {
      var h = parseInt(value, 10);
      return h ? "h-" + h : "";
    },
    "data-width" : function(value) {
      var w = parseInt(value, 10);
      return w ? "w-" + w : "";
    },
    "data-quality" : function(value) {
      var q = parseInt(value, 10);
      return q ? "q-" + q : "";
    },
    "data-crop" : function(value) {
      return value ? "c-" + value : "";
    },
    "data-crop-mode" : function(value) {
      return value ? "cm-" + value : "";
    },
    "data-focus" : function(value) {
      return value ? "fo-" + value : "";
    },
    "data-format" : function(value) {
      return value ? "f-" + value : "";
    },
    "data-rounded-corner" : function(value) {
      var r = parseInt(value, 10);
      return r ? "r-" + r : "";
    },
    "data-border" : function(value) {
      return value ? "b-" + value : "";
    },
    "data-rotation" : function(value) {
      var rt = parseInt(value, 10);
      return rt ? "rt-" + rt : "";
    },
    "data-blur" : function(value) {
      var bl = parseInt(value, 10);
      return bl ? "bl-" + bl : "";
    },
    "data-named" : function(value) {
      return value ? "n-" + value : "";
    },
    "data-overlay-image" : function(value) {
      return value ? "oi-" + value : "";
    },
    "data-overlay-x" : function(value) {
      var ox = parseInt(value, 10);
      return ox ? "ox-" + ox : "";
    },
    "data-overlay-y" : function(value) {
      var oy = parseInt(value, 10);
      return oy ? "oy-" + oy : "";
    },
    "data-overlay-focus" : function(value) {
      return value ? "ofo-" + value : "";
    }
  };

  function getBaseUrl(options) {
    var baseUrl = "";

    if(options["data-host"] && options["data-host"].trim() != "") {
      return options["data-host"];
    }

    if(options["data-usesecure"] === "true") {
      baseUrl = "https://";
    } else {
      baseUrl = "http://";
    }

    if(options["data-usesubdomain"] === "true") {
      baseUrl += options["data-imagekitid"] + ".imagekit.io/" + options["data-url-pattern"];
    } else {
      baseUrl +=  "ik.imagekit.io/" + options["data-imagekitid"] + "/" + options["data-url-pattern"];
    }

    return baseUrl;
  }

  function getAttributes ($node) {
    var attrs = {};
    $.each($node[0].attributes, function (index, attribute) {
      attrs[attribute.name] = attribute.value;
    });
    return attrs;
  }

  function getDefaults() {
    var config = {};
    $.each(imagekit.config, function(key,value) {
      config["data-" + key] = value;
    });
    return config;
  }

  function removeLeadingAndTrailingSlash(str) {
    return str.replace(/^\/|\/$/g, '');
  }

  return imagekit;
}));