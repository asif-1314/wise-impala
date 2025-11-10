/*

Step 1: extends VisualEditor.DynamicPickList class

Step 2: override method 1: geDefaultValue(), return type: VisualEditor.DataRow('', '')

Step 3: override method 2: getValues(), return type: VisualEditor.DynamicPickListRows.addRows(new VisualEditor.DataRow('', ''))

*/

global with sharing class DynamicPicklistController extends VisualEditor.DynamicPickList{

    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('', '--------Select Value--------');
        return defaultValue;
    }

    global override VisualEditor.DynamicPickListRows getValues(){
        VisualEditor.DynamicPickListRows values = new VisualEditor.DynamicPickListRows();
        values.addRow(new VisualEditor.DataRow('Kota', 'Kota'));
        values.addRow(new VisualEditor.DataRow('Ajmer', 'Ajmer'));
        values.addRow(new VisualEditor.DataRow('Jaipur', 'Jaipur'));
        values.addRow(new VisualEditor.DataRow('Udaipur', 'Udaipur'));
        values.addRow(new VisualEditor.DataRow('Jodhpur', 'Jodhpur'));
        return values;
    }
    
}





























