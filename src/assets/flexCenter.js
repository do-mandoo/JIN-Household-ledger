const flexCenter = (options = {}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: options.justifyContent || 'center',
  flexDirection: options.flexDirection || 'column',
  gap: options.gap || 0,
});

export default flexCenter;
