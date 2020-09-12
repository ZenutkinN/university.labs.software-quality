Test coverage report is [here](https://zenutkinn.github.io/Lab%20Test%20Coverage/coverage/lcov-report/index.html)

<a name="Matrix"></a>

## Matrix
Class representing a set of methods for worh with matrix.

**Kind**: global class  

* [Matrix](#Matrix)
    * [new Matrix(matrix)](#new_Matrix_new)
    * _instance_
        * [.equality(matrix)](#Matrix+equality) ⇒ <code>boolean</code>
        * [.addition(matrix)](#Matrix+addition) ⇒ <code>array</code>
        * [.scalarMult(scalar)](#Matrix+scalarMult) ⇒ <code>array</code>
        * [.mult(matrix)](#Matrix+mult) ⇒ <code>array</code>
        * [.transpose()](#Matrix+transpose) ⇒ <code>array</code>
        * [.parse(str)](#Matrix+parse) ⇒ [<code>Matrix</code>](#Matrix)
    * _static_
        * [.tripleAnd(a, b, c)](#Matrix.tripleAnd) ⇒ <code>boolean</code>

<a name="new_Matrix_new"></a>

### new Matrix(matrix)
Create a matrix.


| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>array</code> | Two-dimensional array |

<a name="Matrix+equality"></a>

### matrix.equality(matrix) ⇒ <code>boolean</code>
The 'equality' method allows to check the equivalence of matrices

**Kind**: instance method of [<code>Matrix</code>](#Matrix)  
**Returns**: <code>boolean</code> - - If matrices are equivalent, then 'true' will return otherwise 'false'  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>array</code> | Matrix or several matrices passed through a comma |

<a name="Matrix+addition"></a>

### matrix.addition(matrix) ⇒ <code>array</code>
The 'addition' method allows to summarize matrices

**Kind**: instance method of [<code>Matrix</code>](#Matrix)  
**Returns**: <code>array</code> - - This returns the summed matrix  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>array</code> | Matrix or several matrices passed through a comma |

<a name="Matrix+scalarMult"></a>

### matrix.scalarMult(scalar) ⇒ <code>array</code>
The 'scalarMult' method allows to multiply the matrix by a scalar

**Kind**: instance method of [<code>Matrix</code>](#Matrix)  
**Returns**: <code>array</code> - - This returns the multiplied matrix  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>integer</code> | Scalar |

<a name="Matrix+mult"></a>

### matrix.mult(matrix) ⇒ <code>array</code>
The 'mult' method allows to multiply two matrices.
The number of columns of the first matrix should be equal to the number of rows of the second matrix

**Kind**: instance method of [<code>Matrix</code>](#Matrix)  
**Returns**: <code>array</code> - - This returns the multiplied matrix  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>array</code> | Matrix |

<a name="Matrix+transpose"></a>

### matrix.transpose() ⇒ <code>array</code>
The 'transpose' method allows to swap rows and columns of the matrix.

**Kind**: instance method of [<code>Matrix</code>](#Matrix)  
**Returns**: <code>array</code> - - This returns the transpose matrix  
<a name="Matrix+parse"></a>

### matrix.parse(str) ⇒ [<code>Matrix</code>](#Matrix)
The 'parse' method allows to parse a string into two-dimensional array.
The number of columns of the first matrix should be equal to the number of rows of the second matrix

**Kind**: instance method of [<code>Matrix</code>](#Matrix)  
**Returns**: [<code>Matrix</code>](#Matrix) - - A Matrix instance  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String of type '1 2 3\n4 5 6\n7 8 9' |

<a name="Matrix.tripleAnd"></a>

### Matrix.tripleAnd(a, b, c) ⇒ <code>boolean</code>
The 'tripleAnd' method allows to check for equality three objects.
The number of columns of the first matrix should be equal to the number of rows of the second matrix

**Kind**: static method of [<code>Matrix</code>](#Matrix)  
**Returns**: <code>boolean</code> - - If objects are equal, then 'true' will return otherwise 'false'  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>object</code> | Object |
| b | <code>object</code> | Object |
| c | <code>object</code> | Object |

