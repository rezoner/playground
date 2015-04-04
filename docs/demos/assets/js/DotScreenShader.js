/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

THREE.DotScreenShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
    "center":   { type: "v2", value: new THREE.Vector2( 0.5, 0.5 ) },
		"screenCenter":   { type: "v2", value: new THREE.Vector2( 200, 200 ) },
		"angle":    { type: "f", value: 1.57 },
    "scale":    { type: "f", value: 1.0 },

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform vec2 center;",
		"uniform float angle;",
		"uniform float scale;",
    "uniform vec2 tSize;",
		"uniform vec2 screenCenter;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"float pattern() {",

			"float s = sin( angle ), c = cos( angle );",

			"vec2 tex = vUv * tSize - center;",
			"vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;",

			"return ( sin( point.x ) * sin( point.y ) ) * 4.0;",

		"}",

		"void main() {",
      "vec2 pos = vec2(gl_FragCoord);",
      "float ds = gl_FragCoord[1];",
      "vec4 color = texture2D( tDiffuse, vUv );",
			"float ymod = 1.0; 1.0 - ds / (screenCenter[1] * 2.5);",
      "gl_FragColor = vec4(color.r * ymod, color.g * ymod, color.b * ymod, 1.0 );",
      "gl_FragColor = vec4(color.r * 1.7, color.g * 1.5, color.b * 1.8, 1.0 );",

		"}"

	].join("\n")

};
