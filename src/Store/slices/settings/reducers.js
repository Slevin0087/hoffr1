export const updateSettingByType = (state, action) => {
  const { type, changes } = action.payload;
  const currentSetting = state[type];
  state[type] = { ...currentSetting, ...changes };
};

export const reducers = { updateSettingByType };
