import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'shortenName' })
export class ShortenNamePipe implements PipeTransform {
    transform(value: string) {
        const names = value.split(" ");
        if (names.length < 2) {
            return value;
        }

        return names[0] + " " + names[names.length - 1][0] + ".";
    }

}