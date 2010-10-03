#!/bin/sh

IFS=$'\n'

compress_extjs(){

    echo "OmegaTrick for Ext JS Compress..."

    # JS Code Compress
    DestFile="$OMEGALIB/omegatrick-all.js";
    DebugDestFile="$OMEGALIB/omegatrick-all-debug.js";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi
    if [ -e "$DebugDestFile" ];then
        rm -f "$DebugDestFile"
    fi

    compress_cmd="java -jar $CONSOLE/compiler.jar --compilation_level WHITESPACE_ONLY"

    file=(`cat "$CONSOLE/js.list"`)
    ln=0
    for line in "${file[@]}"; do
        compress_cmd=$compress_cmd" --js=$OMEGALIB/$line"
        cat $OMEGALIB/$line >> $DebugDestFile
    done

    compress_cmd=$compress_cmd" --js_output_file=$DestFile"

    eval $compress_cmd


    # CSS Compress
    DestFile="$OMEGALIB/resources/css/omegatrick-all.css";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi

    file=(`cat "$CONSOLE/css.list"`)
    ln=0
    for line in "${file[@]}"; do

        filename=`echo "$line" | sed 's/\.css/-min\.css/'`
        java -jar yuicompressor-2.4.2.jar --charset UTF-8 $OMEGALIB/resources/css/$line -o $OMEGALIB/resources/css/$filename

        res=$?
        if [ $res == 1 ];then
            error $DestFile
        fi
        cat $OMEGALIB/resources/css/$filename | sed 's/\.\.\/\.\.\/images/\.\.\/images/g' >> $DestFile
        rm $OMEGALIB/resources/css/$filename

    done

}
compress_extcore(){

    echo "OmegaTrick for Ext Core Compress..."

    # JS Code Compress
    DestFile="$OMEGALIB/omegatrick-core-all.js";
    DebugDestFile="$OMEGALIB/omegatrick-core-all-debug.js";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi
    if [ -e "$DebugDestFile" ];then
        rm -f "$DebugDestFile"
    fi

    compress_cmd="java -jar $CONSOLE/compiler.jar --compilation_level WHITESPACE_ONLY"

    file=(`cat "$CONSOLE/core.js.list"`)
    ln=0
    for line in "${file[@]}"; do
        compress_cmd=$compress_cmd" --js=$OMEGALIB/$line"
        cat $OMEGALIB/$line >> $DebugDestFile
    done

    compress_cmd=$compress_cmd" --js_output_file=$DestFile"

    eval $compress_cmd


    # CSS Compress
    DestFile="$OMEGALIB/resources/css/omegatrick-core-all.css";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi

    file=(`cat "$CONSOLE/core.css.list"`)
    ln=0
    for line in "${file[@]}"; do

        filename=`echo "$line" | sed 's/\.css/-min\.css/'`
        java -jar yuicompressor-2.4.2.jar --charset UTF-8 $OMEGALIB/resources/css/$line -o $OMEGALIB/resources/css/$filename

        res=$?
        if [ $res == 1 ];then
            error $DestFile
        fi
        cat $OMEGALIB/resources/css/$filename | sed 's/\.\.\/\.\.\/images/\.\.\/images/g' >> $DestFile
        rm $OMEGALIB/resources/css/$filename

    done

}
compress_senchatouch(){

    echo "OmegaTrick for Sencha Touch Compress..."

    # JS Code Compress
    DestFile="$OMEGALIB/omegatrick-touch-all.js";
    DebugDestFile="$OMEGALIB/omegatrick-touch-all-debug.js";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi
    if [ -e "$DebugDestFile" ];then
        rm -f "$DebugDestFile"
    fi

    compress_cmd="java -jar $CONSOLE/compiler.jar --compilation_level WHITESPACE_ONLY"

    file=(`cat "$CONSOLE/touch.js.list"`)
    ln=0
    for line in "${file[@]}"; do
        compress_cmd=$compress_cmd" --js=$OMEGALIB/$line"
        cat $OMEGALIB/$line >> $DebugDestFile
    done

    compress_cmd=$compress_cmd" --js_output_file=$DestFile"

    eval $compress_cmd


    # CSS Compress
    DestFile="$OMEGALIB/resources/css/omegatrick-touch-all.css";

    if [ -e "$DestFile" ];then
        rm -f "$DestFile"
    fi

    file=(`cat "$CONSOLE/touch.css.list"`)
    ln=0
    for line in "${file[@]}"; do

        filename=`echo "$line" | sed 's/\.css/-min\.css/'`
        java -jar yuicompressor-2.4.2.jar --charset UTF-8 $OMEGALIB/resources/css/$line -o $OMEGALIB/resources/css/$filename

        res=$?
        if [ $res == 1 ];then
            error $DestFile
        fi
        cat $OMEGALIB/resources/css/$filename | sed 's/\.\.\/\.\.\/images/\.\.\/images/g' >> $DestFile
        rm $OMEGALIB/resources/css/$filename

    done

}
help(){
    echo "usage: $CONSOLE/`basename $0` [-jch]"
    echo " -h   : display this usage."
    echo " none : compress js & css files."
    cd $CD
    exit 1
}

### main
CD=`pwd`
CONSOLE=$(cd $(dirname $0) && pwd)
OMEGALIB=`dirname $CONSOLE`
cd $CONSOLE

while getopts cjh opt
do
    case "$opt" in
    j)
        compress_extjs;;
    c)
        compress_extcore;;
    t)
        compress_sencahtouch;;
    *)
        help;;
    esac
done

### options is undef
if [ -z "$1" ];then
    compress_extjs
    compress_extcore
    compress_senchatouch
fi

### back to current dir
cd $CD
