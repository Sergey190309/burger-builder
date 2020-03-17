import React from 'react';

import { configure, shallow } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./burger-builder.container";

import BuildControls from "../../components/burger/build-controls/build-controls.component";

configure({ adapter: new Adaptor() });

describe('<BurgerBuilder /> tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it('should render <BuildControls /> when recieve ingredients', () => {
    wrapper.setProps({ ings: { becon: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
