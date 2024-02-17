import { getHasLaunched, setHasLaunched, checkHasLaunched } from '../../../src/common/EncryptedSession'; 
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';

describe("firstOpen", () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test("test getHasLaunched should return undefined if there is nothing inside of getItem()", async () => {
        mockStorage.getItem.mockImplementation(async (key) => {
            if(key === "hasLaunched"){
                return Promise.resolve(null);
            }
            return Promise.resolve(false);
        })
        const isOpened = await getHasLaunched();
        expect(isOpened).toBe(null);
    })

    test("test that setHasLaunched calls setItem with the correct parameters when setting", async () => { 

        await setHasLaunched();
        expect(mockStorage.setItem).toHaveBeenCalledWith(
            "hasLaunched",
            expect.stringContaining(`true`)
        );
    })

    test("test that getHasLaunched should return true if there is a value to retrieve", async () => {
        mockStorage.getItem.mockImplementation(async (key) => {
            if(key === "hasLaunched"){
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        })

        const isOpened = await getHasLaunched();
        expect(isOpened).toBe(true);
    })

    test("test that checkHasLaunched returns true if there is a hasLaunched variable", async () => {
        mockStorage.getItem.mockImplementation(async (key) => {
            if(key === "hasLaunched"){
                return Promise.resolve("true");
            }
            return Promise.resolve(false);
        })
        const hasLaunched = await checkHasLaunched();
        expect(hasLaunched).toBe(true);
    })

    test("test that chechHasLaunched returns false if there is no hasLaunched variable and calls setItem()", async () => {
        mockStorage.getItem.mockImplementation(async (key) => {
            if(key === "hasLaunched"){
                return Promise.resolve(null);
            }
            return Promise.resolve(false);
        })

        const hasLaunched = await checkHasLaunched();
        expect(hasLaunched).toBe(false);
        expect(mockStorage.setItem).toHaveBeenCalled();
    })
    
})