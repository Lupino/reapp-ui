var React = require('react');
var ViewComponent = require('ui/viewcomponent');
var TitleBar = require('../components/TitleBar');

module.exports = ViewComponent('View', {
  childContextTypes: {
    index: React.PropTypes.number
  },

  getChildContext() {
    return { index: this.props.index };
  },

  render() {
    var {
      children,
      title,
      transform,
      index,
      width,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    if (!title)
      this.addStyles('inner', { top: 0 });

    if (transform)
      this.addStyles('inner', this.getAnimationStyles(transform));

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} index={index}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}>
          {children}
        </div>
      </div>
    );
  }
});