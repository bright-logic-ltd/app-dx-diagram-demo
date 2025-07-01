const projectTasks = [
  {
    id: 3611,
    text: 'End Me\r\n<b>3 Norries Drive, Wallingford</b>',
    toolTipText: '25/06/2025 12:41:13 Pengxin Fan :',
    backgroundColour: 'LightGrey',
    linkedTo: 0,
    isDeletable: true,
    isInactive: true,
  },
  {
    id: 3604,
    text: 'Dick Bryant (A C Lester & Son Ltd)\r\n<b>3 Norries Drive, Wallingford</b>',
    toolTipText: '',
    backgroundColour: '#FFAEAE',
    linkedTo: 3605,
    isDeletable: false,
    isInactive: false,
  },
  {
    id: 3605,
    text: 'Duane Gordon\r\n<b>6450 New Street, Canterbury</b>\r\n017683 83111',
    toolTipText: '',
    backgroundColour: '#FFAEAE',
    linkedTo: 3608,
    isDeletable: false,
    isInactive: false,
  },
  {
    id: 3608,
    text: 'Adsfdasfa\r\n<b>3 Norries Drive, Wallingford</b>',
    toolTipText: '',
    backgroundColour: '#A7EC9D',
    linkedTo: 3610,
    isDeletable: true,
    isInactive: false,
  },
  {
    id: 3610,
    text: 'Abcd Aa\r\n<b>3 Norries Drive, Wallingford</b>',
    toolTipText: '',
    backgroundColour: '#A7EC9D',
    linkedTo: 3611,
    isDeletable: true,
    isInactive: false,
  },
];

export default {
  getTasks() {
    return projectTasks;
  },
};
