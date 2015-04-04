uniform sampler2D tDiffuse;
uniform vec2 textureSize;
 
const float coef = 2.0;
 
const float y_weight = 48.0;
const float u_weight = 7.0;
const float v_weight = 6.0;
 
const mat3 yuv = mat3(0.299, 0.587, 0.114, -0.169, -0.331, 0.499, 0.499, -0.418, -0.0813);
const mat3 yuv_weighted = mat3(y_weight * yuv[0], u_weight * yuv[1], v_weight * yuv[2]);
 
vec4 RGBtoYUV(vec3 v0, vec3 v1, vec3 v2, vec3 v3) {
float a = abs(yuv_weighted * v0).x;
      float b = abs(yuv_weighted * v1).x;
      float c = abs(yuv_weighted * v2).x;
      float d = abs(yuv_weighted * v3).x;
 
      return vec4(a, b, c, d);
    }
 
    bvec4 _and_(bvec4 A, bvec4 B) {
      return bvec4(A.x && B.x, A.y && B.y, A.z && B.z, A.w && B.w);
    }
 
    bvec4 _or_(bvec4 A, bvec4 B) {
      return bvec4(A.x || B.x, A.y || B.y, A.z || B.z, A.w || B.w);
    } 
 
    vec4 df(vec4 A, vec4 B) {
      return vec4(abs(A - B));
    }
 
    vec4 weighted_distance(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e, vec4 f, vec4 g, vec4 h) {
      return (df(a, b) + df(a, c) + df(d, e) + df(d, f) + 4.0 * df(g, h));
    }
 
    void main() {
      vec2 fp = fract(gl_TexCoord[0].xy * textureSize);
 
      vec2 dx = gl_TexCoord[1].xy;
      vec2 dy = gl_TexCoord[1].zw;
 
      vec3 A = texture2D(tDiffuse, gl_TexCoord[0].xy -dx -dy).xyz; 
      vec3 B = texture2D(tDiffuse, gl_TexCoord[0].xy     -dy).xyz; 
      vec3 C = texture2D(tDiffuse, gl_TexCoord[0].xy +dx -dy).xyz; 
      vec3 D = texture2D(tDiffuse, gl_TexCoord[0].xy -dx    ).xyz; 
      vec3 E = texture2D(tDiffuse, gl_TexCoord[0].xy        ).xyz; 
      vec3 F = texture2D(tDiffuse, gl_TexCoord[0].xy +dx    ).xyz; 
      vec3 G = texture2D(tDiffuse, gl_TexCoord[0].xy -dx +dy).xyz; 
      vec3 H = texture2D(tDiffuse, gl_TexCoord[0].xy     +dy).xyz; 
      vec3 I = texture2D(tDiffuse, gl_TexCoord[0].xy +dx +dy).xyz; 
 
      vec3 A1 = texture2D(tDiffuse, gl_TexCoord[0].xy     -dx -2.0*dy).xyz; 
      vec3 C1 = texture2D(tDiffuse, gl_TexCoord[0].xy     +dx -2.0*dy).xyz;
      vec3 A0 = texture2D(tDiffuse, gl_TexCoord[0].xy -2.0*dx     -dy).xyz;
      vec3 G0 = texture2D(tDiffuse, gl_TexCoord[0].xy -2.0*dx     +dy).xyz;
      vec3 C4 = texture2D(tDiffuse, gl_TexCoord[0].xy +2.0*dx     -dy).xyz;
      vec3 I4 = texture2D(tDiffuse, gl_TexCoord[0].xy +2.0*dx     +dy).xyz;
      vec3 G5 = texture2D(tDiffuse, gl_TexCoord[0].xy     -dx +2.0*dy).xyz;
      vec3 I5 = texture2D(tDiffuse, gl_TexCoord[0].xy     +dx +2.0*dy).xyz;
      vec3 B1 = texture2D(tDiffuse, gl_TexCoord[0].xy         -2.0*dy).xyz;
      vec3 D0 = texture2D(tDiffuse, gl_TexCoord[0].xy -2.0*dx        ).xyz;
      vec3 H5 = texture2D(tDiffuse, gl_TexCoord[0].xy         +2.0*dy).xyz;
      vec3 F4 = texture2D(tDiffuse, gl_TexCoord[0].xy +2.0*dx        ).xyz;
 
      vec4 a = RGBtoYUV(A, G, I, C);
      vec4 b = RGBtoYUV(B, D, H, F);
      vec4 c = RGBtoYUV(C, A, G, I);
      vec4 d = RGBtoYUV(D, H, F, B);
      vec4 e = RGBtoYUV(E, E, E, E);
      vec4 f = RGBtoYUV(F, B, D, H);
      vec4 g = RGBtoYUV(G, I, C, A);
      vec4 h = RGBtoYUV(H, F, B, D);
      vec4 i = RGBtoYUV(I, C, A, G);
 
      vec4 a1 = RGBtoYUV(A1, G0, I5, C4);
      vec4 c1 = RGBtoYUV(C1, A0, G5, I4);
      vec4 a0 = RGBtoYUV(A0, G5, I4, C1);
      vec4 g0 = RGBtoYUV(G0, I5, C4, A1);
      vec4 c4 = RGBtoYUV(C4, A1, G0, I5);
      vec4 i4 = RGBtoYUV(I4, C1, A0, G5);
      vec4 g5 = RGBtoYUV(G5, I4, C1, A0);
      vec4 i5 = RGBtoYUV(I5, C4, A1, G0);
      vec4 b1 = RGBtoYUV(B1, D0, H5, F4);
      vec4 d0 = RGBtoYUV(D0, H5, F4, B1);
      vec4 h5 = RGBtoYUV(H5, F4, B1, D0);
      vec4 f4 = RGBtoYUV(F4, B1, D0, H5);
 
      vec4 Ao = vec4( 1.0, -1.0, -1.0,  1.0 );
      vec4 Bo = vec4( 1.0,  1.0, -1.0, -1.0 );
      vec4 Co = vec4( 1.5,  0.5, -0.5,  0.5 );
      vec4 Ax = vec4( 1.0, -1.0, -1.0,  1.0 );
      vec4 Bx = vec4( 0.5,  2.0, -0.5, -2.0 );
      vec4 Cx = vec4( 1.0,  1.0, -0.5,  0.0 );
      vec4 Ay = vec4( 1.0, -1.0, -1.0,  1.0 );
      vec4 By = vec4( 2.0,  0.5, -2.0, -0.5 );
      vec4 Cy = vec4( 2.0,  0.0, -1.0,  0.5 );
 
      // These inequations define the line below which interpolation occurs
      bvec4 fx      = greaterThan(Ao * fp.y + Bo * fp.x, Co); 
      bvec4 fx_left = greaterThan(Ax * fp.y + Bx * fp.x, Cx);
      bvec4 fx_up   = greaterThan(Ay * fp.y + By * fp.x, Cy);
 
      bvec4 t1 = _and_( notEqual(e, f), notEqual(e, h) );
      bvec4 t2 = _and_( notEqual(f, b), notEqual(h, d) );
      bvec4 t3 = _and_( _and_( equal(e, i), notEqual(f, i4) ), notEqual(h, i5) );
      bvec4 t4 = _or_( equal(e, g), equal(e, c) );
      bvec4 interp_restriction_lv1 = _and_(t1, _or_(t2, _or_(t3, t4)));
 
      bvec4 interp_restriction_lv2_left = _and_( notEqual(e, g), notEqual(d, g) );
      bvec4 interp_restriction_lv2_up   = _and_( notEqual(e, c), notEqual(b, c) );
 
      bvec4 edr      = _and_( lessThan(weighted_distance(e, c, g, i, h5, f4, h, f), 
                                       weighted_distance(h, d, i5, f, i4, b, e, i)), interp_restriction_lv1 );
      bvec4 edr_left = _and_( lessThanEqual(coef * df(f, g), df(h, c)), interp_restriction_lv2_left );
      bvec4 edr_up   = _and_( greaterThanEqual(df(f, g), coef * df(h, c)), interp_restriction_lv2_up );
 
      bvec4 nc = _and_( edr, _or_( _or_( fx, _and_(edr_left, fx_left) ), _and_(edr_up, fx_up) ) );
 
      bvec4 px = lessThanEqual(df(e, f), df(e, h));
 
      vec3 res = nc.x ? px.x ? F : H : nc.y ? px.y ? B : F : nc.z ? px.z ? D : B : nc.w ? px.w ? H : D : E;
 
      gl_FragColor.rgb = res;
      gl_FragColor.a = 1.0;