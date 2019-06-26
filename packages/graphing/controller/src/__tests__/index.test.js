import {
  equalPoint,
  equalSegment,
  equalVector,
  equalLine,
  equalRay,
  equalPolygon,
  equalCircle,
  equalSine,
  equalParabola,
  eliminateDuplicates
} from '../index';
import { tools } from '@pie-lib/graphing';

jest.mock('@pie-lib/graphing', () => ({
  tools: {
    utils: {
      sinY: jest.fn(),
      buildDataPoints: (min, max, root, edge) => ([min, root, edge, max]),
      getAmplitudeAndFreq: () => ({
        amplitude: 0,
        freq: 1
      }),
      parabolaFromTwoPoints: jest.fn(),
      FREQ_DIVIDER: 0
    }
  }
}));

describe('controller', () => {});

describe('equalPoint', () => {
  const assert = (pointA, pointB, expected) => {
    it(`${pointA.x},${pointA.y} & ${pointB.x},${pointB.y} ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalPoint(pointA, pointB);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 0, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, false);
});

describe('equalSegment', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalSegment(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 1, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 10, y: 0}, { x: 1, y: 0}, false);
});

describe('equalVector', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalVector(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, false);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 1, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 10, y: 0}, { x: 1, y: 0}, false);
});

describe('equalLine', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalLine(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 3, y: 0}, { x: 1, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 10, y: 10}, { x: 1, y: 0}, false);
});

describe('equalRay', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalRay(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 10, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 3, y: 0}, { x: 1, y: 0}, false);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 10, y: 10}, { x: 1, y: 0}, false);
});

describe('equalPolygon', () => {
  const assert = (pointsA, pointsB, expected) => {
    it(`[${pointsA.forEach(p => `(${p.x}, ${p.y})`)}], [${pointsB.forEach(p => `(${p.x}, ${p.y})`)}] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalPolygon(pointsA, pointsB);

      expect(result).toEqual(expected);
    });
  };

  assert(
    [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
    [{ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 2 }],
    true
    );

  assert(
    [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
    [{ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 0}, { x: 2, y: 2 }],
    true
  );

  assert(
    [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
    [{ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 0}, { x: 2, y: 2 }],
    false
  );
});

describe('equalCircle', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalCircle(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 1, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: -1, y: 0}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 0, y: -1}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 0, y: 1}, true);
  assert({ x: 0, y: 0}, { x: 1, y: 0}, { x: 0, y: 0}, { x: 1, y: 1}, false);
});

describe('equalSine', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalSine(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 1}, { x: 2, y: 0}, { x: 1, y: 1}, true);
  // TODO
});

describe('equalParabola', () => {
  const assert = (pointA, pointB, pointC, pointD, expected) => {
    it(`[(${pointA.x},${pointA.y}), (${pointB.x},${pointB.y})], [(${pointC.x},${pointC.y}), (${pointD.x},${pointD.y})] ${expected ? 'are' : 'are not'} equal`, () => {
      const result = equalParabola(pointA, pointB, pointC, pointD);

      expect(result).toEqual(expected);
    });
  };

  assert({ x: 0, y: 0}, { x: 1, y: 1}, { x: 2, y: 0}, { x: 1, y: 1}, false);
  // TODO
});

describe('eliminateDuplicates', () => {
  const assert = (marks, expected, type) => {
    it(type, () => {
      const result = eliminateDuplicates(marks, expected);

      expect(result).toEqual(expected);
    });
  };

  assert(
    [ { type: 'point', x: 0, y: 0}, { type: 'point', x: 0, y: 0} ],
    {
      point: [{ type: 'point', x: 0, y: 0}],
      segment: [],
      line: [],
      ray: [],
      vector: [],
      polygon: [],
      circle: [],
      sine: [],
      parabola: []
    },
    'point'
    );

  assert(
    [ { type: 'segment', from: { x: 0, y: 0 }, to: { x: 1, y: 1 } }, { type: 'segment', to: { x: 0, y: 0 }, from: { x: 1, y: 1 } } ],
    {
      point: [],
      segment: [{ type: 'segment', from: { x: 0, y: 0 }, to: { x: 1, y: 1 } }],
      line: [],
      ray: [],
      vector: [],
      polygon: [],
      circle: [],
      sine: [],
      parabola: []
    },
    'segment'
  );

  assert(
    [
      { type: 'vector', from: { x: 0, y: 0 }, to: { x: 1, y: 1 } },
      { type: 'vector', from: { x: 0, y: 0 }, to: { x: 1, y: 1 } },
      { type: 'vector', from: { x: 0, y: 0 }, to: { x: 12, y: 1 } }
      ],
    {
      point: [],
      segment: [],
      line: [],
      ray: [],
      vector: [{ type: 'vector', from: { x: 0, y: 0 }, to: { x: 1, y: 1 } }, { type: 'vector', from: { x: 0, y: 0 }, to: { x: 12, y: 1 } }],
      polygon: [],
      circle: [],
      sine: [],
      parabola: []
    },
    'vector'
  );

  assert(
    [
      { type: 'line', from: { x: 0, y: 0 }, to: { x: 1, y: 0 } },
      { type: 'line', from: { x: 0, y: 0 }, to: { x: 12, y: 0 } },
      { type: 'line', from: { x: 0, y: 0 }, to: { x: 12, y: 1 } }
    ],
    {
      point: [],
      segment: [],
      line: [{ type: 'line', from: { x: 0, y: 0 }, to: { x: 1, y: 0 } }, { type: 'line', from: { x: 0, y: 0 }, to: { x: 12, y: 1 } }],
      ray: [],
      vector: [],
      polygon: [],
      circle: [],
      sine: [],
      parabola: []
    },
    'line'
  );

  assert(
    [
      { type: 'ray', from: { x: 0, y: 0 }, to: { x: 1, y: 10 } },
      { type: 'ray', from: { x: 0, y: 0 }, to: { x: 12, y: 0 } },
      { type: 'ray', from: { x: 0, y: 0 }, to: { x: 2, y: 0 } }
    ],
    {
      point: [],
      segment: [],
      line: [],
      ray: [{ type: 'ray', from: { x: 0, y: 0 }, to: { x: 1, y: 10 } }, { type: 'ray', from: { x: 0, y: 0 }, to: { x: 12, y: 0 } }],
      vector: [],
      polygon: [],
      circle: [],
      sine: [],
      parabola: []
    },
    'ray'
  );

  assert(
    [
      { type: 'polygon', points: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }] },
      { type: 'polygon', points: [{ x: 1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }] },
      { type: 'polygon', points: [{ x: 1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 0 }] }
    ],
    {
      point: [],
      segment: [],
      line: [],
      ray: [],
      vector: [],
      polygon: [{ type: 'polygon', points: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }] }, { type: 'polygon', points: [{ x: 1, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 0 }] }],
      circle: [],
      sine: [],
      parabola: []
    },
    'polygon'
  );


  assert(
    [
      { type: 'circle', root: { x: 0, y: 0 }, edge: { x: 1, y: 0 } },
      { type: 'circle', root: { x: 0, y: 0 }, edge: { x: 0, y: 1 } },
      { type: 'circle', root: { x: 0, y: 0 }, edge: { x: -1, y: 0 } }
    ],
    {
      point: [],
      segment: [],
      line: [],
      ray: [],
      vector: [],
      polygon: [],
      circle: [{ type: 'circle', root: { x: 0, y: 0 }, edge: { x: 1, y: 0 } }],
      sine: [],
      parabola: []
    },
    'circle'
  );

  // TODO
  assert(
    [
      { type: 'sine', root: { x: 0, y: 0 }, edge: { x: 1, y: 1 } },
      { type: 'sine', root: { x: 2, y: 0 }, edge: { x: 1, y: 1 } },
      { type: 'sine', root: { x: 2, y: 0 }, edge: { x: 3, y: 1 } },
    ],
    {
      point: [],
      segment: [],
      line: [],
      ray: [],
      vector: [],
      polygon: [],
      circle: [],
      sine: [{ type: 'sine', root: { x: 0, y: 0 }, edge: { x: 1, y: 1 } }],
      parabola: []
    },
    'sine'
  );

  // TODO
  assert(
    [
      { type: 'parabola', root: { x: 0, y: 0 }, edge: { x: 1, y: 1 } },
      { type: 'parabola', root: { x: 2, y: 0 }, edge: { x: 1, y: 1 } },
    ],
    {
      point: [],
      segment: [],
      line: [],
      ray: [],
      vector: [],
      polygon: [],
      circle: [],
      sine: [],
      parabola: [{ type: 'parabola', root: { x: 0, y: 0 }, edge: { x: 1, y: 1 } }, { type: 'parabola', root: { x: 2, y: 0 }, edge: { x: 1, y: 1 } }]
    },
    'parabola'
  );
});
