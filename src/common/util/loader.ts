/**
 * Copyright 2021 Discordeno
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let uniqueFilePathCounter = 0;
let paths: string[] = [];

export async function importDirectory(path: string) {
  path = path.replaceAll("\\", "/");
  const files = Deno.readDirSync(Deno.realPathSync(path));
  // const folder = path.substring(path.indexOf("/src/") + 5);

  // if (!folder.includes("/")) log.info(`Loading ${folder}...`);

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    if (file.isFile) {
      if (!currentPath.endsWith(".ts")) continue;
      paths.push(
        `import "${
          Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))
        }/${
          currentPath.substring(
            currentPath.indexOf("src/"),
          )
        }#${uniqueFilePathCounter}";`,
      );
      continue;
    }

    await importDirectory(currentPath);
  }

  uniqueFilePathCounter++;
}

export async function fileLoader() {
  await Deno.writeTextFile(
    "fileloader.ts",
    paths.join("\n").replaceAll("\\", "/"),
  );
  await import(
    `${
      Deno.mainModule.substring(0, Deno.mainModule.lastIndexOf("/"))
    }/fileloader.ts#${uniqueFilePathCounter}`
  );
  paths = [];
}
