import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxParticlesModule } from '@tsparticles/angular';
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'background',
  imports: [NgxParticlesModule],
  templateUrl: './background.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Background {
  id = 'tsparticles';

  particlesOptions: ISourceOptions = {
    key: 'snow',
    name: 'Snow',
    autoPlay: true,
    background: {
      color: {
        value: '#333333',
      },
      opacity: 1,
    },
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    detectRetina: true,
    fpsLimit: 120,
    interactivity: {
      detectsOn: 'window',
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: {
          delay: 0.5,
          enable: true,
        },
      },
    },
    particles: {
      color: {
        value: '#fff',
      },
      move: {
        direction: MoveDirection.bottom,
        enable: true,
        speed: 2,
        straight: true,
        outModes: {
          default: OutMode.out,
        },
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        value: 400,
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: 10,
      },
      wobble: {
        distance: 10,
        enable: true,
        speed: {
          angle: 10,
          move: 10,
        },
      },
      zIndex: {
        value: {
          min: 0,
          max: 100,
        },
        opacityRate: 10,
        sizeRate: 10,
        velocityRate: 10,
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    smooth: false,
    zLayers: 100,
    motion: {
      disable: true,
      reduce: {
        factor: 4,
        value: true,
      },
    },
  };

  async particlesInit(engine: any): Promise<void> {
    await loadSlim(engine);
  }
}
