import { domElementFromDescription, createNestedElement } from '../scripts/utils';

describe('domElementFromDescription', () => {
  it('Returns an HTML element that fits the description tag', () => {
    const elementDescription = {
      tag: 'div'
    };

    const element = domElementFromDescription(elementDescription);
    expect(element.nodeName).toBe('DIV');
  });

  it('Adds attributes to HTML element', () => {
    const id = 'bla';
    const className = 'test';
    const elementDescription = {
      tag: 'div',
      attributes: { class: className, id }
    };

    const element = domElementFromDescription(elementDescription);
    expect(element.id).toBe(id);
    expect(element.className).toBe(className);
  });

  it('Adds properties to HTML element', () => {
    const textContent = 'cats!';

    const elementDescription = {
      tag: 'div',
      properties: { textContent }
    };

    const element = domElementFromDescription(elementDescription);
    expect(element.textContent).toBe(textContent);
  });

  it('Adds event listeners to HTML element', () => {
    let testCat = 'blue cat';
    const testColor = 'pink cat!';
    const onClick = () => {
      testCat = testColor;
    };

    const elementDescription = {
      tag: 'div',
      listeners: { click: onClick }
    };

    const element = domElementFromDescription(elementDescription);
    element.click();
    expect(testCat).toBe(testColor);
  });
});

describe('createNestedElement', () => {
  it('Creates an HTML element that can have many children', () => {
    const id1 = 'firstKid';
    const id2 = 'secondKid';
    const id3 = 'thirdKid';
    const elementDescription = {
      parent: {
        tag: 'div'
      },
      children: [
        domElementFromDescription({ attributes: { id: id1 } }),
        domElementFromDescription({ attributes: { id: id2 } }),
        domElementFromDescription({ attributes: { id: id3 } })
      ]
    };

    const element = createNestedElement(elementDescription);
    expect(element.children.length).toBe(3);
    expect(element.children[0].id).toBe(id1);
    expect(element.children[1].id).toBe(id2);
    expect(element.children[2].id).toBe(id3);
  });
});