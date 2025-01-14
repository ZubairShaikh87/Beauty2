import * as React from 'react';

export const navigationRef = React.createRef();

export const navigate = (routeName: string, params: any) => {
  navigationRef.current?.navigate(routeName, params);
};

export const changeStack = (stackName: string) => {
  console.log(stackName, 'djskfjdkfj');
  resetRoot(stackName);
};

const resetRoot = (routeName: string) => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{name: routeName}],
  });
};
