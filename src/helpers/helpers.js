import React, {Fragment} from 'react';
/**
 * Helper functions, not specific to React
 */

/**
 * Display a number of string padded with zeroes.
 */
export function pad(str, size) {
    var s = String(str);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

/**
 * Creates a human readable time siganture from ms.
 * 00:00:00:00
 */
export function msToTimeString(ms) {
    var duration  = ms;
    var seconds   = Math.floor((duration / 1000) % 60);
    var minutes   = Math.floor((duration / (1000 * 60)) % 60);
    var hours     = Math.floor((duration / (1000 * 60 * 60)) % 99);
    var omseconds = Math.floor((duration) % 99);

    return (
        <Fragment>
        {pad(hours, 2)}:
        {pad(minutes, 2)}:
        {pad(seconds, 2)}:
        {pad(omseconds, 2)}
        </Fragment>
    );
}