import React from 'react';

import { configure, shallow } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";

import NavigationItems from "./navigation-items.component";
import NavigationItem from "./navigation-item/navigation-item.component";

configure({ adapter: new Adaptor() });

describe('<NavigationItems />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('contains auth when authenticated', () => {
    expect(wrapper.contains(<NavigationItem link="/auth">Log In</NavigationItem>)).toBeTruthy();
  });

  it('contains log out item when authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toBeTruthy();
  });
});
