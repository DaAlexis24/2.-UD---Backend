import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Rectangle } from './shape.ts';

describe('Con un rectángulo de base 3 y altura 4', () => {
  let shape: Rectangle;

  beforeEach(() => {
    // Arrange
    const base = 3;
    const height = 4;
    shape = new Rectangle(base, height);
  });

  test('Su área es 12', () => {
    // Act
    const area = shape.area();
    // Assert
    assert.equal(area, 12);
  });

  test('El perímetro es 14', () => {
    // Act
    const perimeter = shape.perimeter();
    // Assert
    assert.equal(perimeter, 14);
  });
});
