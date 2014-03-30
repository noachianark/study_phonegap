/**
 * @class Business.view.InfoWizards.ImageItem
 * @extends Ext.Component
 * Description
 */
Ext.define('Business.view.InfoWizards.ImageItem', {
    extend: 'Ext.Img',
    alias:'widget.imageitem',

    config: {
		cls:'image-item',
		height:'20vw',
		width:'20vw',
		style:'float:left;border:1px dashed #ff0000',
		margin:'1px 1px 1px 1px',
		src:'resources/images/add_image.png'
    }
});