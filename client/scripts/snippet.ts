export class Snippet {
    public static CREATE_JUNGLE:string = "var a = makeMonkey();\nvar b = makeElephant();";
    public static CREATE_SPACE:string = "var a = makeSpaceShip();\nvar b = makeAsteroid();";
    public static CREATE_SEA:string = "var a = makeShark();\nvar b = makeFish();";
    public static SETTING_JUNGLE:string = "setBackground(\"jungle\");\nplayMusic(\"jungle\");";
    public static SETTING_SPACE:string = "setBackground(\"space\");\nplayMusic(\"space\");";
    public static SETTING_SEA:string = "setBackground(\"underwater\");\nplayMusic(\"underwater\");";
    public static ACTION_JUNGLE:string = "a.jump();\nb.trumpet();";
    public static ACTION_SPACE:string = "a.shoot();\nb.float();";
    public static ACTION_SEA:string = "a.eat();\nb.swim();";
}