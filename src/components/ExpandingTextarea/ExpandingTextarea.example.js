import ExpandingTextarea from './ExpandingTextarea';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas hendrerit tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer suscipit vitae risus et feugiat. Sed dapibus molestie auctor. Fusce faucibus nulla ac eros lacinia consequat. Quisque sodales blandit dolor vel consequat. In purus dui, mollis quis malesuada ut, convallis dapibus arcu. Nam pulvinar, ipsum et accumsan accumsan, urna lectus eleifend nisl, eu finibus mauris dolor quis lectus. Mauris sit amet sem sollicitudin, hendrerit turpis ut, sollicitudin quam. Morbi risus augue, iaculis non malesuada vitae, dignissim ac mauris. Nam urna justo, mollis vel mi vel, consectetur pellentesque lorem.\n\nProin egestas nunc lectus, nec luctus arcu placerat quis. Quisque ac arcu eu urna fringilla consequat a nec elit. Morbi sit amet tempus velit. Pellentesque ac magna tempus nunc consectetur iaculis in eget mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque imperdiet eros in diam rhoncus, vitae blandit turpis egestas. Duis venenatis finibus orci, eget molestie elit. Donec sollicitudin rhoncus neque in viverra. Phasellus mauris velit, aliquet sed dapibus sed, ultricies ut augue. Donec dapibus scelerisque erat ac rhoncus. Duis facilisis risus sit amet erat consectetur gravida.';

export const Empty = {
  component: ExpandingTextarea,
  group: 'custom inputs',
};

export const WithInitialText = {
  component: ExpandingTextarea,
  props: {
    defaultValue: loremIpsum,
  },
  group: 'custom inputs',
};
