package com.example.dirtswordmod;

import net.lax1dude.eaglercraft.v1_8.minecraft.creativetab.CreativeTabs;
import net.lax1dude.eaglercraft.v1_8.minecraft.item.Item;
import net.lax1dude.eaglercraft.v1_8.minecraft.item.ItemSword;
import net.lax1dude.eaglercraft.v1_8.minecraftforge.fml.common.Mod;
import net.lax1dude.eaglercraft.v1_8.minecraftforge.fml.common.event.FMLInitializationEvent;
import net.lax1dude.eaglercraft.v1_8.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.lax1dude.eaglercraft.v1_8.minecraftforge.fml.common.registry.GameRegistry;
import net.lax1dude.eaglercraft.v1_8.minecraft.init.Blocks;
import net.lax1dude.eaglercraft.v1_8.minecraft.init.Items;
import net.lax1dude.eaglercraft.v1_8.minecraft.item.ItemStack;
import net.lax1dude.eaglercraft.v1_8.minecraft.command.CommandBase;
import net.lax1dude.eaglercraft.v1_8.minecraft.command.ICommandSender;
import net.lax1dude.eaglercraft.v1_8.minecraft.server.MinecraftServer;

@Mod(modid = DirtSwordMod.MODID, version = DirtSwordMod.VERSION, name = DirtSwordMod.NAME)
public class DirtSwordMod {
    public static final String MODID = "dirtswordmod";
    public static final String VERSION = "1.0";
    public static final String NAME = "Dirt Sword Mod";

    public static Item dirtSword;

    @Mod.EventHandler
    public void preInit(FMLPreInitializationEvent event) {
        dirtSword = new ItemSword(Item.ToolMaterial.DIAMOND) {
            @Override
            public boolean isDamageable() {
                return false;
            }
        };
        dirtSword.setUnlocalizedName("dirt_sword");
        dirtSword.setRegistryName("dirt_sword");
        dirtSword.setCreativeTab(CreativeTabs.COMBAT);
        dirtSword.setMaxStackSize(1);

        GameRegistry.register(dirtSword);
    }

    @Mod.EventHandler
    public void init(FMLInitializationEvent event) {
        GameRegistry.addShapedRecipe(new ItemStack(dirtSword), 
            " D ", 
            " D ", 
            " S ", 
            'D', Blocks.DIRT, 
            'S', Items.STICK
        );

        MinecraftServer.getServer().getCommandManager().registerCommand(new CommandBase() {
            @Override
            public String getCommandName() {
                return "dirtsword";
            }

            @Override
            public String getCommandUsage(ICommandSender sender) {
                return "/dirtsword - Gives you the Dirt Sword";
            }

            @Override
            public void processCommand(ICommandSender sender, String[] args) {
                if (sender instanceof net.lax1dude.eaglercraft.v1_8.minecraft.entity.player.EntityPlayer) {
                    net.lax1dude.eaglercraft.v1_8.minecraft.entity.player.EntityPlayer player = (net.lax1dude.eaglercraft.v1_8.minecraft.entity.player.EntityPlayer) sender;
                    player.inventory.addItemStackToInventory(new ItemStack(dirtSword));
                }
            }

            @Override
            public int getRequiredPermissionLevel() {
                return 0;
            }
        });
    }
}
