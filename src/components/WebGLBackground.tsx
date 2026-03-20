import { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment shader with animated gradient
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        
        // Create animated waves
        float wave1 = sin(uv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 4.0 + uTime * 0.3) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 2.0 + uTime * 0.4) * 0.5 + 0.5;
        
        // Mix colors
        vec3 color1 = vec3(0.4, 0.2, 0.8); // Purple
        vec3 color2 = vec3(0.9, 0.3, 0.5); // Pink
        vec3 color3 = vec3(0.1, 0.1, 0.2); // Dark blue
        
        vec3 finalColor = mix(color3, color1, wave1);
        finalColor = mix(finalColor, color2, wave2 * 0.5);
        finalColor += vec3(wave3 * 0.1);
        
        gl_FragColor = vec4(finalColor, 0.3);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create a quad
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let animationId: number;

    const render = () => {
      time += 0.01;
      gl.uniform1f(uTime, time);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
