    /*--------------------------------------------------*/

    function matrxMult(a, b) {
        var aNumRows = a.length,
            aNumCols = a[0].length,
            bNumRows = b.length,
            bNumCols = b[0].length;

        if ((aNumCols == bNumRows)) {
            m = new Array(aNumRows); // initialize array of rows
            for (var r = 0; r < aNumRows; ++r) {
                m[r] = new Array(bNumCols); // initialize the current row
                for (var c = 0; c < bNumCols; ++c) {
                    m[r][c] = 0; // initialize the current cell
                    for (var i = 0; i < aNumCols; ++i) {
                        m[r][c] += a[r][i] * b[i][c];
                    }
                }
            }
            return m;
        } else {
            document.write('&nbsp;&nbsp; No. of Cols != No of Rows -- Product UNDefined  <br /><br />');
            return [
                [0]
            ];
        }
    }


    function matrxAdd(a, b) {
        var aNumRows = a.length,
            aNumCols = a[0].length,
            bNumRows = b.length,
            bNumCols = b[0].length;

        if ((aNumCols == bNumCols) && (aNumRows == bNumRows)) {
            m = new Array(aNumRows); // initialize array of rows
            for (var r = 0; r < aNumRows; ++r) {
                m[r] = new Array(bNumCols); // initialize the current row
                for (var c = 0; c < aNumCols; ++i) {
                    m[r][c] = a[r][c] + b[r][c];
                }
            }
            return m;
        } else {
            document.write('&nbsp;&nbsp; No. of Cols and Rows do not match -- Sum UNDefined  <br /><br />');
            return [
                [0]
            ];
        }
    }

    function matrxSubtract(a, b) {
        var aNumRows = a.length,
            aNumCols = a[0].length,
            bNumRows = b.length,
            bNumCols = b[0].length;

        if ((aNumCols == bNumCols) && (aNumRows == bNumRows)) {
            m = new Array(aNumRows); // initialize array of rows
            for (var r = 0; r < aNumRows; ++r) {
                m[r] = new Array(bNumCols); // initialize the current row
                for (var c = 0; c < aNumCols; ++i) {
                    m[r][c] = a[r][c] - b[r][c];
                }
            }
            return m;
        } else {
            document.write('&nbsp;&nbsp; No. of Cols and Rows do not match -- Sum UNDefined  <br /><br />');
            return [
                [0]
            ];
        }
    }

    function vectrTo1ColMatrx(v) {
        var numRows = v.length;
        m = new Array(numRows);
        for (var r = 0; r < numRows; r++) {
            m[r] = new Array(1);
            m[r][0] = v[r];
        }
        return m;
    }

    function vectrTo1RowMatrx(v) {
        var numCols = v.length;
        m = new Array(1);
        m[0] = new Array(numCols);
        for (var c = 0; c < numCols; c++) {
            console.log("c = " + c);
            m[0][c] = v[c];
            console.log("m[0][c] = " + m[0][c]);
            console.log("m[0] = " + m[0]);

        }
        return m;
    }




    function vectrAdd(v, u) {
        var vLngth = v.length;
        var uLngth = u.length;
        if ((uLngth == vLngth)) {
            for (var i = 0; i < vLngth; ++i) {
                u[i] = u[i] + v[i];
            }
            return u;
        } else {
            document.write('&nbsp;&nbsp; dim v != dim u -- Sum UNDefined  <br /><br />');
            return "Error"
        }
    }



    function vectrMltply(v, u) {
        var vLngth = v.length;
        var uLngth = u.length;
        if ((uLngth == vLngth)) {
            for (var i = 0; i < vLngth; ++i) {
                u[i] = u[i] * v[i];
            }
            return u;
        } else {
            document.write('&nbsp;&nbsp; dim v != dim u -- Sum UNDefined  <br /><br />');
            return "Error"
        }
    }



    function vectrSbtrct(v, u) {
        var vLngth = v.length;
        var uLngth = u.length;

        if ((uLngth == vLngth)) {
            for (var i = 0; i < vLngth; ++i) {
                u[i] = u[i] - v[i];
            }
            return u;
        } else {
            document.write('&nbsp;&nbsp; dim v != dim u -- Subract UNDefined  <br /><br />');
            return "Error"
        }
    }


    function dotPrdctb(v, u) {
        var vLngth = v.length;
        var uLngth = u.length;

        if ((uLngth == vLngth)) {
            var dotPrdct = 0;
            for (var i = 0; i < vLngth; ++i) {
                dotPrdct = dotPrdct + u[i] * v[i];
            }
            return dotPrdct
        } else {
            document.write('&nbsp;&nbsp; dim v != dim u -- Subract UNDefined  <br /><br />');
            return "Error"
        }
    }


    function scalrPrdct(r, u) {
        var uLngth = u.length;
        for (var i = 0; i < uLngth; ++i) {
            u[i] = r * u[i];
        }
        return u;
    }


    function vectrReciprcl(u) {
        var uLngth = u.length;
        for (var i = 0; i < uLngth; ++i) {
            if (!(u[i] === 0)) u[i] = 1.0 / u[i];
            else {
                document.write('&nbsp;&nbsp; u[' + i + '] = 0 -- reciprocal  UNDefined  <br /><br />');
                return u[i];
            }
        }
        return u;
    }

    function displyVectr(v) {
        for (var i = 0; i < v.length; ++i) {
            document.write('&nbsp;&nbsp;' + v[i] + ' ');
        }
        document.write('&nbsp;&nbsp;' + '<br /><br />');
    }

    function vectrCp(u, v) {
        var vLngth = v.length;
        var uLngth = u.length;

        if ((uLngth == vLngth)) {
            for (var i = 0; i < vLngth; ++i) v[i] = u[i];
            return v
        } else {
            document.write('&nbsp;&nbsp; dim v != dim u -- Subract UNDefined  <br /><br />');
            return "Error"
        }
    }

    function display(m) {
        for (var r = 0; r < m.length; ++r) {
            document.write('&nbsp;&nbsp;' + m[r].join(' ') + '<br />');
        }
    }

    function displayMatrixDimensions(a) {
        var aNumRows = a.length,
            aNumCols = a[0].length;
        document.write('Number of rows =  ' + aNumRows + '   Number of columns = ' + aNumCols + ' <br /><br />');
    }